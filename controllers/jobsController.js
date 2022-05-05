import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import { sequelize } from "../database/database.js";
import { Op } from "sequelize";
import moment from "moment";
import "moment/locale/fr.js";

/**
 * GET ALL JOBS
 */
const getAllJob = async (req, res) => {
  const { status, jobType, sort, search } = req.query;

  // Query Object
  const queryObject = {
    where: { UserId: req.user.userId },
  };

  // Conditions
  if (status && status !== "all") {
    queryObject.where.status = status;
  }

  if (jobType && jobType !== "all") {
    queryObject.where.jobType = jobType;
  }

  if (search) {
    queryObject.where.position = {
      [Op.like]: `%${search}%`,
    };
  }

  switch (sort) {
    case "latest":
      queryObject.order = [["createdAt", "DESC"]];
      break;
    case "oldest":
      queryObject.order = [["createdAt"]];
      break;
    case "a-z":
      queryObject.order = [["position"]];
      break;
    case "z-a":
      queryObject.order = [["position", "DESC"]];
      break;
    default:
      queryObject.order = [["createdAt", "DESC"]];
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  queryObject.offset = offset;
  queryObject.limit = limit;

  const jobs = await Job.findAndCountAll(queryObject);

  res
    .status(StatusCodes.OK)
    .json({
      jobs: jobs.rows,
      totalJobs: jobs.count,
      numOfPages: Math.ceil(jobs.count / limit),
    });
};

/**
 * CREATE JOB
 */
const createJob = async (req, res) => {
  const { company, position, status, jobType, jobLocation } = req.body;
  if (!company || !position || !jobLocation) {
    throw new BadRequestError("Merci de compléter le formulaire");
  }

  const job = await Job.create({
    company,
    position,
    status,
    jobType,
    jobLocation,
    UserId: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json(job);
};

/**
 * UPDATE JOB
 */
const updateJob = async (req, res) => {
  const jobId = parseInt(req.params.id);
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError("Merci de compléter le formulaire");
  }

  const job = await Job.findByPk(jobId);
  if (!job) {
    throw new NotFoundError("Cette entrée est introuvable.");
  }

  checkPermissions(req.user, job.UserId);

  job.set(req.body);
  const updatedJob = await job.save();

  res.status(StatusCodes.CREATED).json(updatedJob);
};

/**
 * DELETE JOB
 */
const deleteJob = async (req, res) => {
  const jobId = parseInt(req.params.id);

  const job = await Job.findByPk(jobId);
  if (!job) {
    throw new NotFoundError("Cette entrée est introuvable.");
  }

  checkPermissions(req.user, job.UserId);

  await job.destroy();

  res
    .status(StatusCodes.OK)
    .json({ message: "Sauvegarde supprimée avec succès" });
};

/**
 * SHOW STATS
 */
const showStats = async (req, res) => {
  moment().local("fr");

  const stats = await Job.findAll({
    where: { UserId: req.user.userId },
    attributes: [
      "status",
      [sequelize.fn("COUNT", sequelize.col("status")), "count"],
    ],
    group: "status",
  });

  const result = {};
  stats.map((data) => (result[data.dataValues.status] = data.dataValues.count));

  const monthlyApplications = await Job.findAll({
    where: { UserId: req.user.userId },
    attributes: [
      [sequelize.fn("YEAR", sequelize.col("createdAt")), "year"],
      [sequelize.fn("MONTH", sequelize.col("createdAt")), "month"],
      [sequelize.literal(`COUNT(*)`), "total"],
    ],
    group: "month",
    order: [["createdAt", "DESC"]],
    limit: 6,
  });

  const researches = monthlyApplications
    .map(({ dataValues }) => {
      const { year, month, total } = dataValues;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMMM Y");
      return { date, total };
    })
    .reverse();

  res.status(StatusCodes.OK).json({
    stats: {
      pending: result["en cours"] || 0,
      declined: result["refusé"] || 0,
      interview: result["entrevue"] || 0,
    },
    monthlyApplications: researches,
  });
};

export { createJob, deleteJob, getAllJob, updateJob, showStats };

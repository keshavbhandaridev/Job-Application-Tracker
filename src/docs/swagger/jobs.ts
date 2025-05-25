/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job application management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - role
 *         - user
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the job application
 *         user:
 *           type: string
 *           description: Reference to the user who created this job application
 *         company:
 *           type: string
 *           description: Company name
 *         role:
 *           type: string
 *           description: Job position/role
 *         location:
 *           type: object
 *           properties:
 *             country:
 *               type: string
 *             state:
 *               type: string
 *             city:
 *               type: string
 *         isRemote:
 *           type: boolean
 *           default: false
 *           description: Whether the job is remote
 *         status:
 *           type: string
 *           enum: [Applied, Interview, Offer, Rejected]
 *           default: Applied
 *           description: Current status of the job application
 *         notes:
 *           type: string
 *           description: Additional notes about the job application
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the job application was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the job application was last updated
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all job applications for the authenticated user
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of job applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new job application
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - role
 *             properties:
 *               company:
 *                 type: string
 *               role:
 *                 type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                   state:
 *                     type: string
 *                   city:
 *                     type: string
 *               isRemote:
 *                 type: boolean
 *               status:
 *                 type: string
 *                 enum: [Applied, Interview, Offer, Rejected]
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job application created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a specific job application by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job application ID
 *     responses:
 *       200:
 *         description: Job application data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Job application not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a job application
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               role:
 *                 type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                   state:
 *                     type: string
 *                   city:
 *                     type: string
 *               isRemote:
 *                 type: boolean
 *               status:
 *                 type: string
 *                 enum: [Applied, Interview, Offer, Rejected]
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job application updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Job application not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a job application
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job application ID
 *     responses:
 *       200:
 *         description: Job application deleted successfully
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Job application not found
 *       500:
 *         description: Server error
 */
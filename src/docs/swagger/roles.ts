/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Job role management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the role
 *         name:
 *           type: string
 *           description: Name of the job role
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all available job roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all job roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 */

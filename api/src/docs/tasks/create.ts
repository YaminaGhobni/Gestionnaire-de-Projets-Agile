// /**
//  * @swagger
//     post:
//       tags:
//         - Task
//       summary: Create a new task
//       security:
//         - bearerAuth: []
//       consumes:
//         - application/json
//       requestBody:
//         required: true
//         content:
//           application/json:
//             example:
//               startTime: "2024-01-20T08:00:00Z"
//               endTime: "2024-01-20T12:00:00Z"
//               priority: "High"
//               status: "To Do"
//               description: "Complete task XYZ"
//             schema:
//               $ref: '#/components/schemas/CreateTask'
//       responses:
//         '200':
//           description: Task created successfully
//           content:
//             application/json:
//               schema:
//                 type: object
//                 properties:
//                   task:
//                     $ref: '#/components/schemas/GetTask'
//         '400':
//           description: Validation Failed
//         '401':
//           description: Error Token
//         '403':
//           description: Access Denied / Unauthorized
//         '500':
//           description: Internal server error

// components:
//   schemas:
//     CreateTask:
//       type: object
//       properties:
//         startTime:
//           type: string
//           format: date-time
//         endTime:
//           type: string
//           format: date-time
//         priority:
//           type: string
//           enum: [Low, Medium, High]
//         status:
//           type: string
//           enum: [Pending, To Do, In Progress, Completed, Tested, Done]
//         description:
//           type: string

//     GetTask:
//       type: object
//       properties:
//         startTime:
//           type: string
//           format: date-time
//         endTime:
//           type: string
//           format: date-time
//         priority:
//           type: string
//           enum: [Low, Medium, High]
//         status:
//           type: string
//           enum: [Pending, To Do, In Progress, Completed, Tested, Done]
//         description:
//           type: string

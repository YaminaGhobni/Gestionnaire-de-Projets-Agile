/**
 * @swagger
 * /users:
 *    post:
 *      tags: [User]
 *      summary: Create a new user
 *      security:
 *        - bearerAuth: []
 *      consumes:
 *        - application/json
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              example:
 *                firstName: "mohammed"
 *                lastName: "bin salman"
 *                userName: "MBS"
 *                email: "mbs@gmail.com"
 *                phoneNumber: "23878321"
 *                role: "USER"
 *                password: "mmbs1234"
 *              schema:
 *                $ref: '#components/schemas/CreateUser'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/GetUser'
 *        400:
 *          description: Validation Failed
 *        401:
 *          description: Error Token
 *        403:
 *          description: Access Denied / Unauthorized
 *        500:
 *          description: Internal server error
 */

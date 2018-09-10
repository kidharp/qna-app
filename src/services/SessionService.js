const Session = require('../models/Session');
const UserSessionService = require('./UserSessionService');
const EditorSessionService = require('./EditorSessionService');
const UserService = require('./UserService');

module.exports = {
  getServiceByRole(role) {
    switch (role) {
      case 'USER': {
        return UserSessionService;
      }
      case 'EDITOR': {
        return EditorSessionService;
      }
      default:
        throw new Error('No role returned');
    }
  },

  async getSessionById(sessionId) {
    try {
      const result = await Session.getSessionById(sessionId);
      return result;
    } catch (err) {
      throw err;
    }
  },

  async addQuestion(sessionId, userId, question) {
    try {
      if (userId == -1) {
        userId = UserService.getDefaultUserId();
      }
      const result = await UserService.getRoleOfUserInSession(userId, sessionId);
      const role = result.Role;

      const service = this.getServiceByRole(role);
      const questionId = await service.addQuestion(userId, sessionId, question.title,
        question.content);
      return questionId;
    } catch (err) {
      throw err;
    }
  },
};

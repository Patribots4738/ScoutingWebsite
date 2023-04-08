class TeamNumberError extends Error {
    constructor(message) {
      super(message); // (1)
      this.name = "TeamNumberError"; // (2)
    }
}

export default TeamNumberError;

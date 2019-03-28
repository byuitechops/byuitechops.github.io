class UserObject { 
      constructor(name, actionID, currentAction, email, lead,
             prepares, requests, reviews, role, 
             transcriptions, typing) { 
            this.name = name;
            this.actionID = actionID;
            this.currentAction = currentAction;
            this.email = email;
            this.lead = lead;
            this.prepares = prepares;
            this.requests = requests;
            this.reviews = reviews;
            this.role = role;
            this.transcriptions = transcriptions;
            this.typing = typing;
      }

      // Getters - Once the object is created, it allows it to be read by specific data
     getName() { return this.name; }
     getActionID() { return this.actionID; }
     getCurrentAction() { return this.currentAction; }
     getEmail() { return this.email; }
     getLead() { return this.lead; }
     getPrepares() { return this.prepares; }
     getRequests() { return this.requests; }
     getReviews() { return this.reviews; }
     getRole() { return this.role; }
     getTranscriptions() { return this.transcriptions; }
     getTyping() { return this.typing; }
}

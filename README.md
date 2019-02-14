# GameQueue
This is a simple web API for queuing users for a game and managing the highscores.
# API endpoints
# GET
/nextTeam - returns a json object with {teamName:someName} or {error:msgHere}

# POST
/addTeam - takes json{teamName:someName} <br/>
/newScore - takes json{teamName:someName, score,sessionScore}



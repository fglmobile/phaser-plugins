/**
 * FGL.js
 *
 * FGL HTML5 SDK plugin for use with phaser.io
 *
 * Provides bindings for fgl.com services
 */
 
 
 //PLUGIN SETUP
Phaser.Plugin.FGL = function (parent) {
  Phaser.Plugin.call(this, game, parent);
  
  if(('__fgl' in window) == false) {
    throw new Error("FGL is not defined!");
  }
  
  this.avar = null;
};

Phaser.Plugin.FGL.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.FGL.prototype.constructor = Phaser.Plugin.FGL;


// SDK FUNCTIONS
/**
 * Report current game state
 * @param {string} state game state to report
 */
Phaser.Plugin.FGL.prototype.reportGameState = function (state) {
  if(('__fgl' in window)) {
    __fgl['reportGameState'](state);
  }
};

/**
 * Request quit to shut down cleanly
 */
Phaser.Plugin.FGL.prototype.requestQuit = function () {
  if(('__fgl' in window)) {
    __fgl['requestQuit']();
  }
};

/**
 * Show an advertisement
 * @param {Object} options options to send to ad server. Can be omitted
 */
Phaser.Plugin.FGL.prototype.showAd = function (options) {
  if(('__fgl' in window)) {
    __fgl['showAd'](options);
  }
};

/**
 * Submits the given score to the specified leaderboard. If your game
 * only has one leaderboard, do not supply a leaderboardID.
 * @param {Number} score Score to submit
 * @param {string} leaderboardID Name of the leaderboard to show
 */
Phaser.Plugin.FGL.prototype.submitScore = function(score, leaderboardID, extra) {
  if(('__fgl' in window)) {
    __fgl['submitScore'](score, leaderboardID, extra);
  }
};

/**
 * Displays the scoreboard UI over your game
 * @param {string} leaderboardID Name of the leaderboard to show
 * @param {Number} highlightScore Index of score in the list to highlight (0 for none)
 */
Phaser.Plugin.FGL.prototype.displayScoreboard = function(leaderboardID, highlightScore) {
  if(('__fgl' in window)) {
    __fgl['displayScoreboard'](leaderboardID, highlightScore);
  }
};

/**
 * Forcibly removes the scoreboard UI from your game. This should not be
 * necessary (the player can easily dismiss all overlays)
 */
Phaser.Plugin.FGL.prototype.hideScoreboard = function(e) {
  if(('__fgl' in window)) {
    __fgl['hideScoreboard'](e);
  }
};

/**
 * Grants a specified achievement to the player
 * @param {string} achievementId achievement ID to grant to the player
 */
Phaser.Plugin.FGL.prototype.grantAchievement = function(achievementId) {
  if(('__fgl' in window)) {
    __fgl['grantAchievement'](achievementId);
  }
};

/**
 * Show achievements the player has unlocked
 */
Phaser.Plugin.FGL.prototype.showAchievements = function() {
  if(('__fgl' in window)) {
    __fgl['showAchievements']();
  }
};

/**
 * Get whether a particular achievement has been unlocked
 * @param {string} achievementId achievement ID to grant to the player
 * @returns {boolean} true if the achievement has been unlocked
 */
Phaser.Plugin.FGL.prototype.hasAchievement = function(achievementId) {
  if(('__fgl' in window)) {
    return __fgl['hasAchievement'](achievementId);
  }
  return false;
};

/**
 * Check whether we are running the premium (no ads) version of the game
 * @returns {boolean} true if the game is running in premium mode
 */
Phaser.Plugin.FGL.prototype.isPremium = function() {
  if(('__fgl' in window)) {
    return __fgl['isPremium']();
  }
  return false;
};

/**
 * Show the 'more games' cross promotion overlay
 */
Phaser.Plugin.FGL.prototype.showMoreGames = function() {
  if(('__fgl' in window)) {
    __fgl['showMoreGames']();
  }
};

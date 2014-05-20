/**
 * FGL.js
 *
 * FGL HTML5 SDK plugin for use with Phaser
 *
 * Provides bindings and helper functions for using FGL SDK features.
 */
 
 
 //PLUGIN SETUP
Phaser.Plugin.FGL = function (game, parent) {
  Phaser.Plugin.call(this, game, parent);
  
  // Setup: 
  if(('__fgl' in window) == false) {
    throw new Error('You need to include the FGL SDK in your project, add the following script tag to your HTML file:\n<script src="https://sites.mpstatic.com/html5/sdks/1.4.2/fgl.js"></script>');
  }
  
  // TODO: Is there a better way to do this?
  // This works, but doesn't seem watertight.
  game.fgl = this;
  
  // Auto-load branding:
  if(window.__fgl['brandingEnabled']){
    var loader = new Phaser.Loader(game)
    loader.image('fgl-branding-image', window.__fgl['getBrandingLogo']());
    loader.start();
  }
  
};

Phaser.Plugin.FGL.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.FGL.prototype.constructor = Phaser.Plugin.FGL;

/**
 * Creates a new FGL Publisher Branding button object.
 *
 * @method Phaser.GameObjectFactory#fglPublisherBranding
 * @param {number} [x] X position of the new button object.
 * @param {number} [y] Y position of the new button object.
 * @param {number} [width] Width of the branding image. Height will automatically keep the apsect.
 * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
 * @return {Phaser.Button} The newly created button object.
 */
Phaser.GameObjectFactory.prototype.fglPublisherBranding = function (x, y, width, group) {
  if (!window.__fgl['brandingEnabled']) return {destroy: function(){}};
  
  if (typeof group === 'undefined') { group = this.world; }
  width = width || 250;
  
  var button = group.add(new Phaser.Button(this.game, x, y, 'fgl-branding-image', window.__fgl['handleBrandingClick']));
  
  button.width = width;
  button.height = width * (100/250);
  
  return button;
}

/**
 * Creates a new More Games Button object if cross promotion is enabled.
 *
 * @method Phaser.GameObjectFactory#fglMoreGamesButton
 * @param {number} [x] X position of the new button object.
 * @param {number} [y] Y position of the new button object.
 * @param {string} [key] The image key as defined in the Game.Cache to use as the texture for this button.
 * @param {string|number} [overFrame] This is the frame or frameName that will be set when this button is in an over state. Give either a number to use a frame ID or a string for a frame name.
 * @param {string|number} [outFrame] This is the frame or frameName that will be set when this button is in an out state. Give either a number to use a frame ID or a string for a frame name.
 * @param {string|number} [downFrame] This is the frame or frameName that will be set when this button is in a down state. Give either a number to use a frame ID or a string for a frame name.
 * @param {string|number} [upFrame] This is the frame or frameName that will be set when this button is in an up state. Give either a number to use a frame ID or a string for a frame name.
 * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
 * @return {Phaser.Button} The newly created button object.
 */
Phaser.GameObjectFactory.prototype.fglMoreGamesButton = function (x, y, key, overFrame, outFrame, downFrame, upFrame, group) {
  if (!window.__fgl['crossPromotionEnabled']) return {destroy: function(){}};
  if (typeof group === 'undefined') { group = this.world; }

  return group.add(new Phaser.Button(this.game, x, y, key, window.__fgl['showMoreGames'], null, overFrame, outFrame, downFrame, upFrame));
};

/**
 * Creates a new Upgrade Button object if in-app-upgrade is enabled.
 *
 * @method Phaser.GameObjectFactory#fglMoreGamesButton
 * @param {number} [x] X position of the new button object.
 * @param {number} [y] Y position of the new button object.
 * @param {string} [key] The image key as defined in the Game.Cache to use as the texture for this button.
 * @param {function} [successCallback] The function to call when the game is succesfully unlocked
 * @param {function} [failCallback] The function to call when the game fails to unlock
 * @param {string|number} [overFrame] This is the frame or frameName that will be set when this button is in an over state. Give either a number to use a frame ID or a string for a frame name.
 * @param {string|number} [outFrame] This is the frame or frameName that will be set when this button is in an out state. Give either a number to use a frame ID or a string for a frame name.
 * @param {string|number} [downFrame] This is the frame or frameName that will be set when this button is in a down state. Give either a number to use a frame ID or a string for a frame name.
 * @param {string|number} [upFrame] This is the frame or frameName that will be set when this button is in an up state. Give either a number to use a frame ID or a string for a frame name.
 * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
 * @return {Phaser.Button} The newly created button object.
 */
Phaser.GameObjectFactory.prototype.fglUpgradeButton = function (x, y, key, successCallback, failCallback, overFrame, outFrame, downFrame, upFrame, group) {
  if (!window.__fgl['unlockEnabled']) return {destroy: function(){}};
  if (window.fgl['isPremium']()) return {destroy: function(){}};
  
  if (typeof group === 'undefined') { group = this.world; }

  return group.add(new Phaser.Button(this.game, x, y, key, function(){ 
    window.__fgl['inApp']['initiateUnlockFunction'](successCallback, failCallback);
  }, null, overFrame, outFrame, downFrame, upFrame));
};

// SDK FUNCTIONS
/**
 * Report current game state
 * @param {string} state game state to report
 */
Phaser.Plugin.FGL.prototype.reportGameState = function (state) {
  if ( ! ('__fgl' in window)) return;
  __fgl['reportGameState'](state);
};

/**
 * Request quit to shut down cleanly
 */
Phaser.Plugin.FGL.prototype.requestQuit = function () {
  if ( ! ('__fgl' in window)) return;
  __fgl['requestQuit']();
};

/**
 * Show an advertisement
 * @param {Object} options options to send to ad server. Can be omitted
 */
Phaser.Plugin.FGL.prototype.showAd = function (options) {
  if ( ! ('__fgl' in window)) return;
  __fgl['showAd'](options);
};

/**
 * Submits the given score to the specified leaderboard. If your game
 * only has one leaderboard, do not supply a leaderboardID.
 * @param {Number} score Score to submit
 * @param {string} leaderboardID Name of the leaderboard to show
 */
Phaser.Plugin.FGL.prototype.submitScore = function(score, leaderboardID, extra) {
  if ( ! ('__fgl' in window)) return;
  __fgl['submitScore'](score, leaderboardID, extra);
};

/**
 * Displays the scoreboard UI over your game
 * @param {string} leaderboardID Name of the leaderboard to show
 * @param {Number} highlightScore Index of score in the list to highlight (0 for none)
 */
Phaser.Plugin.FGL.prototype.displayScoreboard = function(leaderboardID, highlightScore) {
  if ( ! ('__fgl' in window)) return;
  __fgl['displayScoreboard'](leaderboardID, highlightScore);
};

/**
 * Forcibly removes the scoreboard UI from your game. This should not be
 * necessary (the player can easily dismiss all overlays)
 */
Phaser.Plugin.FGL.prototype.hideScoreboard = function(e) {
  if ( ! ('__fgl' in window)) return;
  __fgl['hideScoreboard'](e);
};

/**
 * Grants a specified achievement to the player
 * @param {string} achievementId achievement ID to grant to the player
 */
Phaser.Plugin.FGL.prototype.grantAchievement = function(achievementId) {
  if ( ! ('__fgl' in window)) return;
  __fgl['grantAchievement'](achievementId);
};

/**
 * Show achievements the player has unlocked
 */
Phaser.Plugin.FGL.prototype.showAchievements = function() {
  if ( ! ('__fgl' in window)) return;
  __fgl['showAchievements']();
};

/**
 * Get whether a particular achievement has been unlocked
 * @param {string} achievementId achievement ID to grant to the player
 * @returns {boolean} true if the achievement has been unlocked
 */
Phaser.Plugin.FGL.prototype.hasAchievement = function(achievementId) {
  if ( ! ('__fgl' in window)) return false;
  return __fgl['hasAchievement'](achievementId);
};

/**
 * Check whether we are running the premium (no ads) version of the game
 * @returns {boolean} true if the game is running in premium mode
 */
Phaser.Plugin.FGL.prototype.isPremium = function() {
  if ( ! ('__fgl' in window)) return false;
  return __fgl['isPremium']();
};

/**
 * Show the 'more games' cross promotion overlay
 */
Phaser.Plugin.FGL.prototype.showMoreGames = function() {
  if ( ! ('__fgl' in window)) return;
  __fgl['showMoreGames']();
};

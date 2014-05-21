/**
 * FGL.js
 *
 * FGL HTML5 SDK plugin for use with Phaser
 *
 * Provides bindings and helper functions for using FGL SDK features.
 */
 
 
/**
 * Constructor
 */
Phaser.Plugin.FGL = function (game, parent) {
  Phaser.Plugin.call(this, game, parent);
  
  // Setup: 
  if(('fgl' in window) == false) {
    throw new Error('You need to include the FGL SDK in your project, add the following script tag to your HTML file:\n<script src="https://sites.mpstatic.com/html5/sdks/1.4.2/fgl.js"></script>');
  }
  
  // Auto-load branding:
  if(window.fgl['brandingEnabled']){
    var loader = new Phaser.Loader(game);
    loader.image('fgl-branding-image', window.fgl['getBrandingLogo']());
    console.log(window.fgl['getBrandingLogo']());
    loader.start();
  }
  
};

Phaser.Plugin.FGL.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.FGL.prototype.constructor = Phaser.Plugin.FGL;

// Special button that is always invisible and has no pressed callback
DisabledButton = function (game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
  Phaser.Button.call(this, game, x, y, key, null, callbackContext, overFrame, outFrame, downFrame, upFrame);
  this.visible = false;
}
DisabledButton.prototype = Object.create(Phaser.Button.prototype);
DisabledButton.prototype.constructor = DisabledButton;
Object.defineProperty(DisabledButton.prototype, 'visible', {
  get: function() { return false; }, set: function(val) { }
});

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
  if (typeof group === 'undefined') { group = this.world; }
  width = width || 250;
  
  // If fgl branding is not enabled, return a disabled button that never renders or raises a pressed callback
  if (!window.fgl['brandingEnabled']) { return group.add(new DisabledButton(this.game, x, y, 'fgl-branding-image', null)); };
  var button = group.add(new Phaser.Button(this.game, x, y, 'fgl-branding-image', window.fgl['handleBrandingClick']));
  
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
  if (typeof group === 'undefined') { group = this.world; }
  
  if (!window.fgl['crossPromotionEnabled']) { return group.add(new DisabledButton(this.game, x, y, key, null)); };

  return group.add(new Phaser.Button(this.game, x, y, key, window.fgl['showMoreGames'], null, overFrame, outFrame, downFrame, upFrame));
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
  if (typeof group === 'undefined') { group = this.world; }
  
  if (!window.fgl['unlockEnabled']) { return group.add(new DisabledButton(this.game, x, y, key, null)); };
  if (window.fgl['isPremium']()) { return group.add(new DisabledButton(this.game, x, y, key, null)); };
  
  return group.add(new Phaser.Button(this.game, x, y, key, function(){ 
    window.fgl['inApp']['initiateUnlockFunction'](successCallback, failCallback);
  }, null, overFrame, outFrame, downFrame, upFrame));
};
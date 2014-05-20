FGL SDK for Phaser
------------------

Todo: Fill out this documentation properly.

## Implementation

### Step 1

Add the FGL Plugin and SDK scripts to your index.html file:

```js
<script src="https://sites.mpstatic.com/html5/sdks/1.4.2/fgl.js"></script>
<script src="Plugins/FGL/FGL.js"></script>
```

### Step 2

Register the plugin in your boot.create function:

```js
MyGame.Boot.prototype = {
  create: function () {
    this.game.plugins.add(Phaser.Plugin.FGL);
    
    // Other cool boot things.
  }
}
```

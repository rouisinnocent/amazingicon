# amazingicon.js
Small library to change an image's color on hover/mouseover.

# how to use

  - Download `tinycolor.js`
  - Download `amazingicon.js`
  - Put them in your `<head>` element in a `<script>` tag in that order.
  
  - Your image source should have a transparent/white background, the drawing can be in any other color.
  
  - Your icons in html should look like this:
  
    ```html
    <a class="amazingIcon" href="some-url" data-src="icon-image-url">icon-label</a>
    ```
  
  - In your javascript file, you put:
  
    ```javascript
    AmazingIcon.parseDocument(); //Goes through the whole document and converts anchors with the amazingIcon class to amazingIcons.
    
    AmazingIcon.hover(function(icon,ev){ //Pass a function that takes an AmazingIcon and an Event as parameters.
      icon.setColor("lightblue"); //change color
      icon.setLabel("Peekabooh"); //change label
      icon.setHref("http://www.google.com"); //change href
    });
    
    AmazingIcon.unhover("reset"); //Pass a "reset" string to any event reset the icon's attributes to the originals.
    
    AmazingIcon.click(function(icon,ev){
      icon.setColor("blue"); //change color
    });
    
    ```
  
  Up until now those are the three natively supported events, but you can add yours by accessing the Amazing Icon's anchor directly:
  
  ```javascript
  anyIcon.anchor; // returns Amazing Icon's anchor (wrapper) element.
  ```

  - You can get icons in a lot of different ways, all case insensitive:
  
    ```javascript
    AmazingIcon.get(index); //Returns the icon at that index.
    AmazingIcon.getByLabel(label); //icon with that label
    AmazingIcon.getByOrigin(originalLabel); //icon with that original label(label stablished in the html)
    AmazingIcon.getByLabelID(labelID); //a label id is the icon's label stripped of spaces.
    ```
  - You can erase an icon by calling the `del()` method

  ```javascript
  anyIcon.del();
  ```

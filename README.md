# Markup Editor

Welcome to this cool little repository. There is not much to it, just a custom
implementation of a markup editor. Feel free to goof off with it see if you can improve the algorithm,
add in better list behavior etc.., turn the code into library code or something fun.

## About The Code

Although not the most robust and complicated implementation this set up is neat in a few other
areas such as its modularity and scalability. The code is set up to easily expand and build up your
own custom markup editor behavior by simply adding to the markupMap and token array.

** Example: **

```
const markUpArrChecker = ["#", "-", "*", "1.", "`", .... add more here];

markupMap.set("#", {
  code: "whatever token you want to add",
  start: "What your starting tag will be",
  end: "What your closing tag will be",
  wraps: Does this token wrap or nest? or will it cancel when a new line is created?,
});
```

Editing the array of markers and adding to markupMap with your custom code allows you to
define a pretty cool and unique markup editor behavior of your own.

## How it works

The main script simply grabs the entire value of the textarea a user is typing in, runs the text through the
markup parser and renders the new html in the display div.

parse.js where the fun stuff is works as such.

1. Takes in the text and splits it by each character
2. Maps through the entire array of text
3. Each character is checked to see if it exists in our token array
   if it is found the token is placed in a stack and an empty string is returned. This continues until
   a non token character is found. If the token does not exist in the array we simply return
   the character
4. When the stack is full and a non token character is found we check the map for a token that
   matches the token within out stack.
5. When we find a match we add in the opening or closing tags based on the previous marks stack. If
   it is an opening tag we add it to the previous marks stack. If it is a closing tag we pop from the previous marks
   stack. This allows us to nest properly and in the correct order
6. If there is no match we do nothing and simply return the text

There is a basic overview of the program. Fork, pull, do as you wish!!!!

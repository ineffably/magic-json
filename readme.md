# Magic JSON

The idea I had behind Magic JSON is that I can throw it large sets of json and it can figure out the  relational data, tables and pivot points for data presentation. 

It would then allow the user to create a configuration for how the JSON data is displayed, filtered and presented.

This is also a collection of libraries and components I'm working on for use in other projects. utilities I use like `traverse`, `indexBy`, etc. There might be other utilitiy libraries that have some overlap and that's ok

## Monorepo

to install and run locally
```
npm i             # install all the things    
npm watch         # build and watch core and editor
npm run examples  # examples hosts the editor
```

## MVP Features

This library won't be published until this minimum criteria is met...

1. ~~Basic supporting libraries for transforms `jsonToMagicJson` etc.~~
1. ~~test framework setup and running tests and converage~~ 
1. ~~add a stats element that will contain hints for common fields, tables, and relational data~~
1. detectors that easily allow one to configure how the json is displayed.
1. editor interface:
   1. ~~User inteface tha allows one to view and debug the magic-json format~~
   1. An intuitive stats view that allows one to see what magic-json encountered
   1. UI that allows one to view pivot points, suggested tables and columns
   1. UI that provides affordances to elements for constructing a presentation configuration for the target JSON. 
  
 


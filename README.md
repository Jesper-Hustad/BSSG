# BSSG - Based Static Site Generator

Finally an SSG that isn't bloated (within NodeJS limits).  
The entire generator is a single 150 line script that you are free to edit.  

A `index.html` and `template.html` file is all you need to get running.  

All markdown `.md` files become pages, converted into html and inserted in the `template.html`.  
Page titles get converted to a `<li>` list with corresponding `<a>` links and inserted in `index.html`.  

That's it. The output directory is a `public` folder.  
All files are included in the output so you can add addition html pages if you wish.



To get started clone the repository and run these commands in the directory 
```
npm install
npm build
```

# BSSG

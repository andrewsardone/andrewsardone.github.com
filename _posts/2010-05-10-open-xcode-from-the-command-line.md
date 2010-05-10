---
layout: post
title: Open Xcode From the Command Line
---

This is just a quick tip given that a lot of people have grown to love TextMate's `mate` [command](http://manual.macromates.com/en/using_textmate_from_terminal.html). Simply add the following to your shell's configuration file to simulate the behavior for Xcode.

<script src="http://gist.github.com/395995.js?file=gistfile1.sh"></script>

Without any parameters, `xcode` simply looks for an Xcode project file to open.

    $ ls
    Classes                Mapper-Info.plist      Mapper_Prefix.pch build
    MainWindow.xib         Mapper.xcodeproj       RootViewController.xib main.m
    
    $ xcode    # opens Mapper.xcodeproj

You can also name the file you'd like to open in Xcode.

    $ xcode main.m    # opens main.m in an Xcode editor window

---
layout: post
title: Using JungleDisk for Remote Git Repositories
---

I'm a big fan of [Amazon S3](http://aws.amazon.com/s3/), and one of the easiest ways to interact with it for personal use is [JungleDisk](http://www.jungledisk.com/). JungleDisk uses WebDAV to connect to your S3 buckets, allowing you to browse and interact with them locally as you would any other filesystem.

One use for JungleDisk that I find to be really handy is hosting remote Git repositories I can push content to for backup purposes. It's really simple and helps preserve any random repository where using something like [GitHub](http://github.com) would be overkill.

First, I have a little helper script, `makeGitRepo`:

<script src="http://gist.github.com/215436.js"></script>

Pop that on to my `$PATH` and I can easily create a remote repository on my JungleDisk:

<script src="http://gist.github.com/215438.js"></script>

Then all I need to do is add it as a remote within my Git repository and push:

<script src="http://gist.github.com/215439.js"></script>

Easy enough.
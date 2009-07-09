---
layout: post
title: Using JungleDisk for Remote Git Repositories
---

I'm a big fan of [Amazon S3](http://aws.amazon.com/s3/), and one of the easiest ways to interact with it for personal use is [JungleDisk](http://www.jungledisk.com/). JungleDisk uses WebDAV to connect to your S3 buckets, allowing you to browse and interact with them locally as you would any other filesystem.

One use for JungleDisk that I find to be really handy is hosting remote Git repositories I can push content to for backup purposes. It's really simple and helps preserve any random repository where using something like [GitHub](http://github.com) would be overkill.

First, I have a little helper script, `makeGitRepo`:

{% highlight bash %}
#!/usr/bin/env bash                                                                                                                    
#
# Usage: 
#   makeGitRepo project_name
# 

mkdir -m 770 $1.git
cd $1.git
git --bare init --shared=group
{% endhighlight %}

Pop that on to my `$PATH` and I can easily create a remote repository on my JungleDisk:

{% highlight bash %}
$ pushd /Volumes/JungleDisk/Git
$ makeGitRepo project
{% endhighlight %}

Then all I need to do is add it as a remote within my Git repository and push:

{% highlight bash %}
$ pushd ~/code/project
$ git remote add jungledisk /Volumes/JungleDisk/Git/project.git
$ git push --all jungledisk
{% endhighlight %}

Easy enough.
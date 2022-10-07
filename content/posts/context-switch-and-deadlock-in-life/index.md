---
title: "Context Switch and Deadlock in life"
date: 2022-10-07T23:35:15+07:00
draft: false
---

Context switching of multiple tasking may affect performance in a bad way. The reason could be the practice of organizing known tasks or the problem of dealing with sudden incoming events. That is where prioritizing and time boxing techniques come in. It is very similar to what is stated in the operating system, context switching requires time to save the state of the current process and reload the state of other processes the get it ready for running.

> Single-tasking over multiple-tasking to make every single thing completely done.
> 

There will be time you get into the state of deadlock. That is to say, you cannot move forward to do what you expect or want to do and even cannot move backward to do things that you were able to do. It is like what concurrent computing states: deadlock is the situation in which two or more processes are waiting for required resources simultaneously to complete their tasks. And a solution to this is to break the resource dependence cycle. By that, you simply temporarily pause one or several processes to let the others get theirs done.

> Temporarily pause or even get rid of some things to let the others done. Then all can be done.
>
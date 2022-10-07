---
title: "Reactjs Atom"
date: 2022-10-07T21:46:07+07:00
draft: true
---

## ReactJS & Chemical Atom

ReactJS - a very popular library for front-end development powered by Facebook. It was influenced by the XHP which is a template engine to generate HTML in PHP language. It was first achieved by a Facebook engineer after a negotiation with his manager to implement the idea of XHP for browser execution.

DOM manipulation is expensive and he wanted the library to intellectually and automatically determine when the necessary changes are in need of updates. The initial diffing algorithm then was built with the complexity of O(3). After a few improvements, the engineers found that it was able to achieve O(1) by approaching a HashMap where every DOM element has its own unique key.

ReactJS is shipped with the declarative programming paradigm. Everything starts by setting a function similar to (a, b) ⇒ a + b telling the machine to re-calculate the result of a + b whenever value a or b gets changed during execution. In actual implementation, it can be a plain JS function or a class derived from React.Component or React.PureComponent.

That is a brief history of ReactJS and its logo, a Chemical Atom, stayed in my head for days when I first read about it.

There are several keys that should be noticed when creating a React component. The Single responsibility is to create every component that ideally does only one thing. Don’t repeat yourself (or DRY) to avoid repetition patterns in code (or boilerplate) and data redundancy by using abstraction and normalization. The component should be minimal but complete to represent data and manage data (known as state). Or separate UI layer concerns from logic by creating container and presentational components. These key ideas purposely make every React component perfectly re-useable and manageable.

Once I had the idea of creating an ideal React component, I just thought it was quite similar to a chemical atom. Remember the chemistry class? An atom is a combination of a nucleus (proton & neutron) and electron(s) surrounding it in their own orbits. Many atoms can be together by stealing or sharing the electron(s) of others to create a new element or compound. And many elements or compounds together can form a substance in the form of solid, liquid, or gas. So, a chemical atom can be seen as the most basic and smallest unit to construct any object in the universe.

Analogously, the most minimal React component is made to create other components through inheritance or composition. The component can be modularized to be a concrete library and re-used anywhere in an application or publicly used in other applications.

It is fun to create apps and see chemical reaction. You can start by visiting [ReactJS official website](https://reactjs.org) and learn more about its ecosystem [here](https://github.com/enaqx/awesome-react).
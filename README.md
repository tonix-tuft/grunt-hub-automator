# Grunt Hub Automator

A Grunt Hub suitable to run as a daemon which helps executing tasks on multiple Grunt projects.

## Prerequisites

The only prerequisite is to have `npm` installed. You should already have it if you use `Grunt`. If so, skip to the *Getting Started* section.

If you don't have `npm`, take a look at the [NPM's installation guide](https://www.npmjs.com/get-npm).

Basically, all you need to do is to install `node` (which will install `npm` too) and then issue the following command to update `npm` to the
latest version:

```
$ npm install npm@latest -g
```

**NOTE**: if you are using OS X, you may need to prefix the command with `sudo`, therefore:

```
$ sudo npm install npm@latest -g
```

## Getting Started

When you are done with the *Prerequisites*, clone the repository on your local machine, enter it and launch the `npm install` command:

```
$ git clone https://github.com/tonix-tuft/grunt-hub-automator
$ cd grunt-hub-automator
$ npm install
```

Now you can set up your Grunt Hub Automator.

## Set Up

The following steps must be done:

- Creating a new Gruntfile.js from the sample file provided with this repo (**Gruntfile.sample.js**);
- Creating a new *daemonizing* script from the sample file provided with this repo (**grunt-hub-automator.sample**);

### Gruntfile.sample.js

Copy or rename this file to *Gruntfile.js*. Open *Gruntfile.js*, and replace the `src` property with the paths to your projects:

```
  ...
  grunt.initConfig({
    hub: {
      all: {
        src: ['/path/to/*/Gruntfile.js'] <--- Replace this path with the path to your Grunt project or with the paths to your Grunt projects if they are more than one.
  ...
```

The idea is that every user who has cloned this repo has its own Gruntfile.js, which will act as a configuration for the Grunt Hub Automator.
The Grunt Hub Automator will then run as a daemon and use this configuration to search for specific Gruntfile.js files to load.

### grunt-hub-automator.sample

The last step is to set up the daemon which will run the Grunt Hub Automator. Copy or rename the script *grunt-hub-automator.sample*
to *grunt-hub-automator*.

The default *daemonizing* tool used by Grunt Hub Automator is the `daemon` command, which you can be found both on OS X and on Linux.
The file contains several variables needed to configure the command which you may edit if you need.

Otherwise, all you need to do is to install the `daemon` command and register the *grunt-hub-automator* script as a service.

Below the instructions depending on your platform.

#### OS X

To install the `daemon` command, you can use [brew](https://brew.sh/index.html):

```
$ brew install daemon
```

After the daemon command is installed, copy or rename the sample *com.grunt.hub.automator.plist* to create a launch agent:

- Open the file and edit the line `<string>/Must/Be/An/Absolute/Path/To/Your/grunt-hub-automator/grunt-hub-automator</string>`
so that it points to your *grunt-hub-automator* script (it must be an **absolute path**)
- Move the file to `/Library/LaunchAgents/`:

```
$ sudo mv ./com.grunt.hub.automator.plist /Library/LaunchAgents/com.grunt.hub.automator.plist
```

Load and start the new created agent so that it runs automatically when you boot your machine:

```
$ launchctl load -w /Library/LaunchAgents/com.grunt.hub.automator.plist
```

This command is the same as running the provided script `start-os-x`:

```
$ ./start-os-x
```

If you ever need to stop the daemon, use the provided script named `stop-os-x`:

```
$ ./stop-os-x
```

#### Linux



#### Windows

Oops! There's nothing for Windows. I guess Windows users won't even look at this repo, anyway.

### After you ran the daemon

After you launch the daemon on your system you can see a log file with a path name similar to `/tmp/grunt-hub-automator.tmp.CY0h1P7b.log`.
Please keep in mind that these file will be recreated from scratch each time you restart the daemon.
If this is not what you want, edit the *grunt-hub-automator* script.

## Acknowledgements

* [shama/grunt-hub](https://github.com/shama/grunt-hub)

## Authors

* **Tonix-Tuft**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

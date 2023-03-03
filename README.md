# Kaholo File System Plugin
This plugin extends Kaholo's functionality to include common filesystem operations - creating, deleting, copying, and moving files and directories, as well as asserting that a path exists on the Kaholo agent.

If this is not the functionality you require these other plugins may be of interest...
* [TextEditor Plugin](https://github.com/Kaholo/kaholo-plugin-text-editor/releases)
* [SSH Plugin](https://github.com/Kaholo/kaholo-plugin-ssh/releases), which includes `scp` to/from remote servers
* [Zip Plugin](https://github.com/Kaholo/kaholo-plugin-zip/releases), and of course
* [Command Line Plugin](https://github.com/Kaholo/kaholo-plugin-cmd/releases) which can be used to `tar`, `rm`, `shred`, `cp`, `mv`, and many other things.

Paths used in this plugin may be either relative or absolute. Relative paths are relative to the default working directory on the Kaholo agent. At the time this was writting the default directory is `/twiddlebug/workspace`. Use the [Command Line Plugin](https://github.com/Kaholo/kaholo-plugin-cmd/releases) to run command `pwd` to determine the default working directory of your Kaholo agent.

## Method: Copy File/Directory
Copy File/Directory from source path to destination path on the Kaholo agent. For directories the copy is recursive, including subdirectories and files.

### Parameter: Source Path
Path of the file/directory to copy.
### Parameter: Destination Path
The path of the new copy.
### Parameter: No Overwrite
If selected, don't copy if it will overwrite existing files or directories.

## Method: Create Directory
Create a new directory in the provided path on the Kaholo agent. The full path will be created if it doesn't already exist, similar to command `mkdir -p`.

### Parameter: Path
The path of the new directory.

## Method: Move File/Directory 
Move a file/directory from the source path to the destination path. For directories the move is recursive, including all subdirectories and files.

### Parameter: Source Path
The path of the file/directory to move.
### Parameter: Destination Path
The path to which it will be moved.
### Parameter: No Overwrite
If selected, the move won't be done if destination path already exists.

## Method: Delete File/Directory
Delete the file/directory in the specified path. For directories the deletion is recursive, deleting all subdirectories and files.

### Parameter: Path
The path of the file/directory to delete.

## Method: Path Exists
Check whether the specified path exists or not, returning either `"exists": true` or `"exists": false` as JSON in the Final Result.

### Parameter: Path
The path of the file/directory to check for existance.

## Method: SCP Action (Deprecated)
Use SSH/SCP to download or upload files from remote hosts. This method is deprecated in favor of the [SSH Plugin](https://github.com/Kaholo/kaholo-plugin-ssh/releases). If this is inconvenient, please do not upgrade the plugin, or if you already have then downgrade. See [INSTALL.md](./INSTALL.md) for details.
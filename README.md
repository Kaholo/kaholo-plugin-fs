# kaholo-plugin-fs
File system plugin from Kaholo.

## Method Copy File/Directory
Copy File/Directory from source path to destination path.

### Parameters
1. Source Path (string) **required** - path of the file/directory to copy
2. Destination Path (string) **required** - new path of the copy
3. No Overwrite (boolean) **optional** - When passed as true, don't copy if overwrites existing files. Default is false.

## Method Create Directory
Create a new directory in the provided path.

### Parameters
1. Path (string) **required** - The path of the new directory.

## Method Move File/Directory 
Move a file/directory from the source path to destination.

### Parameters
1. Source Path (string) **required** - path of the file/directory to move
2. Destination Path (string) **required** - The path to copy to.
3. No Overwrite (boolean) **optional** - When passed as true, don't move if destination path already exists.

## Delete File/Directory
Delete the file/directory in the specified path.

### Parameters
1. Path (string) **required** - The path of the file/directory to delete.

## Method Path Exists
Returns does the path specified exists or not.

### Parameters
1. Path (string) **required**

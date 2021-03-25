# kaholo-plugin-fs
File system plugin from Kaholo.

## Method Copy Path
Copy File/Directory from source path to destination path. Uses Copy command in Windows and cp on linux.

### Parameters
1. Source Path(string)**required**
2. Destination Path(string)**required**
3. Flags(string)**optional**

## Method Create Directory
Create a new directory in the provided path. Uses mkdir command.

### Parameters
1. Path(string)**required**
2. Flags(string)**optional**

## Method Move Directory
Move a directory from the source path to destination. Uses mv command.

### Parameters
1. Source Path(string)**required**
2. Destination Path(string)**required**
3. Flags(string)**optional**

## Delete Directory
Delete the directory in the specified path. Uses rmdir command.

### Parameters
1. Path(string)**required**
2. Flags(string)**optional**

## Method Path Exists
Returns does the path specified exists or not.

### Parameters
1. Path(string)**required**

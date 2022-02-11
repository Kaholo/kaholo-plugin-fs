# kaholo-plugin-fs
File system plugin from Kaholo.

## Method: Copy File/Directory
Copy File/Directory from source path to destination path.

### Parameters
1. Source Path (string) **Required** - Path of the file/directory to copy.
2. Destination Path (string) **Required** - New path of the copy.
3. No Overwrite (boolean) **Optional** - When passed as true, don't copy if overwrites existing files. Default value is false.

## Method: Create Directory
Create a new directory in the provided path.

### Parameters
1. Path (string) **Required** - The path of the new directory.

## Method: Move File/Directory 
Move a file/directory from the source path to the destination path.

### Parameters
1. Source Path (string) **Required** - Path of the file/directory to move.
2. Destination Path (string) **Required** - The path to move to.
3. No Overwrite (boolean) **Optional** - When passed as true, don't move if destination path already exists.

## Method: Delete File/Directory
Delete the file/directory in the specified path.

### Parameters
1. Path (string) **Required** - The path of the file/directory to delete.

## Method: Path Exists
Check whether the specified path exists or not.

### Parameters
1. Path (string) **Required**

## Method: SCP Action (Remote Download/Upload)
Use SSH To download or upload files from remote hosts. You can download/upload either a file or a directory.

### Parameters
1. Host URL (String) **Required** - The URL or IP Address of the host to upload or download the files from.
2. Port (Integer) **Optional** - The port to communicate with the remote host. Default value is 22.
3. SSH Username (String) **Required** - The username to use to authenticate to the host over SSH.
4. SSH Private Key (Vault) **Optional** - The private key to use to authenticate to the SSH host with.
5. SSH Private Key Path (String) **Optional** - The path of the private key to use to authenticate to the ssh host with.
> **Please Notice!** You can't use both SSH Private Key and SSH Private Key Path! You can only provide one of them.
6. SSH Private Key Passphrase (Vault) **Optional** - The passphrase for the private key that was provided. Only specify in case you have a passphrase for your private key.
7. SCP Action Type (Options) **Required** - The type of action to do on the specified host. Possible values are:
* Download File
* Download Directory
* Upload File
* Upload Directory
8. Local Path (String) **Required** - The path of the local file/directory. In case of an upload action, specified file or directory must exist in the local agent this method was called from, and is uploaded to the host. In case of a download, the remote file\directory will be downloaded to the specified path.
9. Remote Path (String) **Required** - The path of the remote file/directory. In case of an upload action, this will be the path the file/directory will be uploaded to. In case of a download, the specified path must exist in the remote host, and the file\directory will be downloaded to the local path.

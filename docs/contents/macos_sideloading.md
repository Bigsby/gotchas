Say you're developing in **macOS** and you are testing a custom [dynamic library](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/DynamicLibraries/100-Articles/CreatingDynamicLibraries.html) (`.dylib`). It's all great when you compile with something like:
```sh
$ clang -lmy_dynamic_library -L. -o myApp myApp.c
```
...but, when you run your app, you get something like this:
```sh
$ ./myApp
dyld: Library not loaded: @rpath/libmy_dynamic_library.dylib
  Referenced from: /Users/user/./myApp
  Reason: image not found
Abort trap: 6
```

As the message says, `image not found`, i.e., the library file could not be located. One could:
- disable [System Integrity Protection](https://developer.apple.com/documentation/security/disabling_and_enabling_system_integrity_protection) so that set `DYLD_XXXX_PATH` environment variables are passed onto subprocesses, or;
- copy (requiring elevated permissions) the library to a [standard location](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/DynamicLibraries/100-Articles/UsingDynamicLibraries.html).

That is all too much work, to say the least. The issue is the way the dynamic library is being referenced. By default, `@rpath` is set so the it's is searched for in the standard locations. Let's see:
```sh
$ otool -L myApp
myApp:
        @rpath/libmy_dynamic_library.dylib (compatibility version 0.0.0, current version 0.0.0)
        /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 1292.100.5)
```
All is needed is to change the reference path in the executable like so:
```sh
$ install_name_tool -change @rpath/libmy_dynamic_library.dylib ./libmy_dynamic_library.dylib myApp
```
After that:
```sh
$ otool -L myApp
myApp:
        ./libmy_dynamic_library.dylib (compatibility version 0.0.0, current version 0.0.0)
        /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 1292.100.5)
```
And the library is loaded with no issues.
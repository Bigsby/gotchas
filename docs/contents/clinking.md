There is a lot going on when compiling even the simplest _Hello, world!_ in **C**. Let's take a simple _hello.c_:
```c
#include <stdio.h>

int main()
{
    printf("Hello, world!\n");
}
```

...compile it with [gcc](https://linux.die.net/man/1/gcc):
```sh
$ gcc hello.c -o hello
```

...and run it:
```sh
$ ./hello
Hello, world!
```

One would thing the _only_ content on the resulting _hello_ file would be the _main_ function but that is far for truth. Let's see what [nm](https://linux.die.net/man/1/nm) has to show:
```sh
$ nm hello
0000000000004030 B __bss_start
0000000000004030 b completed.7325
                 w __cxa_finalize@@GLIBC_2.2.5
0000000000004020 D __data_start
0000000000004020 W data_start
0000000000001080 t deregister_tm_clones
00000000000010f0 t __do_global_dtors_aux
0000000000003df0 t __do_global_dtors_aux_fini_array_entry
0000000000004028 D __dso_handle
0000000000003df8 d _DYNAMIC
0000000000004030 D _edata
0000000000004038 B _end
00000000000011b4 T _fini
0000000000001130 t frame_dummy
0000000000003de8 t __frame_dummy_init_array_entry
0000000000002154 r __FRAME_END__
0000000000004000 d _GLOBAL_OFFSET_TABLE_
                 w __gmon_start__
0000000000002014 r __GNU_EH_FRAME_HDR
0000000000001000 t _init
0000000000003df0 t __init_array_end
0000000000003de8 t __init_array_start
0000000000002000 R _IO_stdin_used
                 w _ITM_deregisterTMCloneTable
                 w _ITM_registerTMCloneTable
00000000000011b0 T __libc_csu_fini
0000000000001150 T __libc_csu_init
                 U __libc_start_main@@GLIBC_2.2.5
0000000000001135 T main
                 U puts@@GLIBC_2.2.5
00000000000010b0 t register_tm_clones
0000000000001050 T _start
0000000000004030 D __TMC_END__
```

That's a mouthful... but this is just a dynamically linked executable, as [gcc](https://linux.die.net/man/1/gcc) does by default. That is because [gcc](https://linux.die.net/man/1/gcc) links by default. As [file](https://linux.die.net/man/1/file) can show us:
```sh
$ file hello
hello: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=16447818ee8a943c740e798502de69368488fbc4, not stripped
```

[gcc](https://linux.die.net/man/1/gcc) is, in fact, a frontend that streamlines the whole process of going from **C** files to a usable binary, i.e., an executable, or a library. The process consists of:
- Preprocessing - resolve and replace macros, e.g., _#include_, _#define_
- Compilation - transpile *C* into assembly code
- Assembling - compile assembly code into a binary
- Linking - link the binary to all the references, i.e., resolve of the references

Let's go though all those...coming up!...
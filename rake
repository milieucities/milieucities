execve("/usr/bin/test", ["test"], [/* 81 vars */]) = 0
brk(NULL)                               = 0x1673000
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
mmap(NULL, 8192, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7fdbe572a000
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
fstat(3, {st_mode=S_IFREG|0644, st_size=112784, ...}) = 0
mmap(NULL, 112784, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7fdbe570e000
close(3)                                = 0
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
open("/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0P\t\2\0\0\0\0\0"..., 832) = 832
fstat(3, {st_mode=S_IFREG|0755, st_size=1864888, ...}) = 0
mmap(NULL, 3967488, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7fdbe513e000
mprotect(0x7fdbe52fe000, 2093056, PROT_NONE) = 0
mmap(0x7fdbe54fd000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1bf000) = 0x7fdbe54fd000
mmap(0x7fdbe5503000, 14848, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x7fdbe5503000
close(3)                                = 0
mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7fdbe570d000
mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7fdbe570c000
mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7fdbe570b000
arch_prctl(ARCH_SET_FS, 0x7fdbe570c700) = 0
mprotect(0x7fdbe54fd000, 16384, PROT_READ) = 0
mprotect(0x60a000, 4096, PROT_READ)     = 0
mprotect(0x7fdbe572c000, 4096, PROT_READ) = 0
munmap(0x7fdbe570e000, 112784)          = 0
brk(NULL)                               = 0x1673000
brk(0x1694000)                          = 0x1694000
open("/usr/lib/locale/locale-archive", O_RDONLY|O_CLOEXEC) = 3
fstat(3, {st_mode=S_IFREG|0644, st_size=10219008, ...}) = 0
mmap(NULL, 10219008, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7fdbe477f000
close(3)                                = 0
close(1)                                = 0
close(2)                                = 0
exit_group(1)                           = ?
+++ exited with 1 +++

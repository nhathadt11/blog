---
title: "CPU Architecture and Assembly"
date: 2023-11-08T20:10:26+07:00
draft: false
tags: [computer, programming]
---

A random old note illustrating a low-level programming language (assembly) interacts with registers.
{{< figure src="posts/cpu-arch-and-assembly/images/image.png" title="CPU Architecture" >}}

```nasm
include \masm32\include\masm32rt.inc

swap2 PROTO : PTR DWORD, :PTR DWORD

.code
start:
    call main
    exit
main proc
    LOCAL var1:DWORD
    LOCAL pVar1:DWORD
    LOCAL var2:DWORD
    LOCAL pVar2:DWORD

    mov var1, sval(input("Enter number 1: "))
    mov var2, sval(input("Enter number 2: "))

    lea eax, var1
    mov pVar1, eax
    lea eax, var2
    mov pVar2, eax

    push eax
    push ebx
    invoke swap2, pVar1, pVar2
    pop ebx
    pop eax

    print chr$("After swapping:")
    print str$(var1)
    print chr$(", ")
    print str$(var2)

    ret
main endp

swap2 proc add1: PTR DWORD, add2: PTR DWORD

    print chr$("Argument 1, address: ")
    lea eax, add1
    print str$(eax)
    print chr$(", value: ")
    print str$(add1)
    print chr$(13,10)
    print chr$("Argument 2, address: ")
    lea eax, add2
    print str$(eax)
    print chr$(", value: ")
    print str$(add2)
    print chr$(13,10)

    mov edx, add1
    mov eax, [edx]
    mov edx, add2
    mov ebx, [edx]
    mov edx, add1
    mov [edx], ebx
    mov edx, add2
    mov [edx], eax
    ret
swap2 endp

end start
```

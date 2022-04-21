# eecs183-typescript-p4

尝试利用 typescript 来完成 [UMich EECS183 Project 4](https://eecs183.github.io/p4-battleship/)

主要是练习 ES6 的 class 特性, 包括进入 ES2022 规范的 Private class fields and methods. 把 tsconfig.json 的 target 切换一下就能看到不同的目标代码实现

另外就是当有了 private member 之后，Class Instance 的复制没找到现成的方案. 不同于 C++ 对象赋值时随便就完成了拷贝, JS Non-primitive 类型赋值都是传引用. 这样为了真正达成对 private member 的保护 + 提供 getter 方法, 就只能自己来实现 copy

和 C++ 一样，对 private member 的保护是 class-level 的, 不是 object-level. 因此可以在 Player::attach 里访问 opponent(another instance of the same class) 里的各 member

相比较原版 C++ 的需求, 去掉了对 Stream 的操作要求. C++ 的操作符重载，以及同步的 IO stream 和 JS runtime 差别太大了! 至于调用 'fs' 模块里的同步读取方法, 仍然需要用到 try/catch.

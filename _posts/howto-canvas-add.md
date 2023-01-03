---
title: "can't add node-canvas on M1mac"
created_at: "2022-11-05"
updated_at: "2022-11-05"
categories: ["react", "how-to"]
---

## 目次

## error log

```bash
error /Users/yourname/program/fqqk_blog_app/node_modules/canvas: Command failed.
Exit code: 1
Command: node-pre-gyp install --fallback-to-build
Arguments:
Directory: /Users/yourname/program/fqqk_blog_app/node_modules/canvas
Output:
node-pre-gyp info it worked if it ends with ok
node-pre-gyp info using node-pre-gyp@0.11.0
node-pre-gyp info using node@18.10.0 | darwin | arm64
node-pre-gyp WARN Using needle for node-pre-gyp https download
node-pre-gyp info check checked for "/Users/yourname/program/fqqk_blog_app/node_modules/canvas/build/Release/canvas.node" (not found)
node-pre-gyp http GET https://github.com/node-gfx/node-canvas-prebuilt/releases/download/v2.6.1/canvas-v2.6.1-node-v108-darwin-unknown-x64.tar.gz
node-pre-gyp http 404 https://github.com/node-gfx/node-canvas-prebuilt/releases/download/v2.6.1/canvas-v2.6.1-node-v108-darwin-unknown-x64.tar.gz
node-pre-gyp WARN Tried to download(404): https://github.com/node-gfx/node-canvas-prebuilt/releases/download/v2.6.1/canvas-v2.6.1-node-v108-darwin-unknown-x64.tar.gz
node-pre-gyp WARN Pre-built binaries not found for canvas@2.6.1 and node@18.10.0 (node-v108 ABI, unknown) (falling back to source compile with node-gyp)
node-pre-gyp http 404 status code downloading tarball https://github.com/node-gfx/node-canvas-prebuilt/releases/download/v2.6.1/canvas-v2.6.1-node-v108-darwin-unknown-x64.tar.gz
gyp info it worked if it ends with ok
gyp info using node-gyp@9.1.0
gyp info using node@18.10.0 | darwin | arm64
gyp info ok
gyp info it worked if it ends with ok
gyp info using node-gyp@9.1.0
gyp info using node@18.10.0 | darwin | arm64
gyp info find Python using Python version 3.10.6 found at "/opt/homebrew/opt/python@3.10/bin/python3.10"
gyp info spawn /opt/homebrew/opt/python@3.10/bin/python3.10
gyp info spawn args [
gyp info spawn args   '/opt/homebrew/Cellar/node/18.10.0/libexec/lib/node_modules/npm/node_modules/node-gyp/gyp/gyp_main.py',
gyp info spawn args   'binding.gyp',
gyp info spawn args   '-f',
gyp info spawn args   'make',
gyp info spawn args   '-I',
gyp info spawn args   '/Users/yourname/program/fqqk_blog_app/node_modules/canvas/build/config.gypi',
gyp info spawn args   '-I',
gyp info spawn args   '/opt/homebrew/Cellar/node/18.10.0/libexec/lib/node_modules/npm/node_modules/node-gyp/addon.gypi',
gyp info spawn args   '-I',
gyp info spawn args   '/Users/yourname/Library/Caches/node-gyp/18.10.0/include/node/common.gypi',
gyp info spawn args   '-Dlibrary=shared_library',
gyp info spawn args   '-Dvisibility=default',
gyp info spawn args   '-Dnode_root_dir=/Users/yourname/Library/Caches/node-gyp/18.10.0',
gyp info spawn args   '-Dnode_gyp_dir=/opt/homebrew/Cellar/node/18.10.0/libexec/lib/node_modules/npm/node_modules/node-gyp',
gyp info spawn args   '-Dnode_lib_file=/Users/yourname/Library/Caches/node-gyp/18.10.0/<(target_arch)/node.lib',
gyp info spawn args   '-Dmodule_root_dir=/Users/yourname/program/fqqk_blog_app/node_modules/canvas',
gyp info spawn args   '-Dnode_engine=v8',
gyp info spawn args   '--depth=.',
gyp info spawn args   '--no-parallel',
gyp info spawn args   '--generator-output',
gyp info spawn args   'build',
gyp info spawn args   '-Goutput_dir=.'
gyp info spawn args ]
gyp info ok
gyp info it worked if it ends with ok
gyp info using node-gyp@9.1.0
gyp info using node@18.10.0 | darwin | arm64
gyp info spawn make
gyp info spawn args [ 'BUILDTYPE=Release', '-C', 'build' ]
  SOLINK_MODULE(target) Release/canvas-postbuild.node
  CXX(target) Release/obj.target/canvas/src/backend/Backend.o
../src/backend/Backend.cc:111:10: warning: address of stack memory associated with local variable 'msg' returned [-Wreturn-stack-address]
  return msg.c_str();
         ^~~
1 warning generated.
  CXX(target) Release/obj.target/canvas/src/backend/ImageBackend.o
  CXX(target) Release/obj.target/canvas/src/backend/PdfBackend.o
  CXX(target) Release/obj.target/canvas/src/backend/SvgBackend.o
  CXX(target) Release/obj.target/canvas/src/bmp/BMPParser.o
  CXX(target) Release/obj.target/canvas/src/Backends.o
  CXX(target) Release/obj.target/canvas/src/Canvas.o
In file included from ../src/Canvas.cc:21:
../src/Util.h:17:7: warning: 'SetAccessor' is deprecated [-Wdeprecated-declarations]
        Nan::SetAccessor(
             ^
../../nan/nan.h:2512:1: note: 'SetAccessor' has been explicitly marked deprecated here
NAN_DEPRECATED inline void SetAccessor(
^
../../nan/nan.h:110:40: note: expanded from macro 'NAN_DEPRECATED'
# define NAN_DEPRECATED __attribute__((deprecated))
                                       ^
../src/Canvas.cc:415:26: warning: comparison of integers of different signs: 'int' and 'const size_t' (aka 'const unsigned long') [-Wsign-compare]
    if (canvas->nBytes() > node::Buffer::kMaxLength) {
        ~~~~~~~~~~~~~~~~ ^ ~~~~~~~~~~~~~~~~~~~~~~~~
2 warnings generated.
  CXX(target) Release/obj.target/canvas/src/CanvasGradient.o
  CXX(target) Release/obj.target/canvas/src/CanvasPattern.o
  CXX(target) Release/obj.target/canvas/src/CanvasRenderingContext2d.o
../src/CanvasRenderingContext2d.cc:7:10: fatal error: 'cairo/cairo-pdf.h' file not found
#include <cairo/cairo-pdf.h>
         ^~~~~~~~~~~~~~~~~~~
1 error generated.
make: *** [Release/obj.target/canvas/src/CanvasRenderingContext2d.o] Error 1
gyp ERR! build error
gyp ERR! stack Error: `make` failed with exit code: 2
gyp ERR! stack     at ChildProcess.onExit (/opt/homebrew/Cellar/node/18.10.0/libexec/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:201:23)
gyp ERR! stack     at ChildProcess.emit (node:events:513:28)
gyp ERR! stack     at ChildProcess._handle.onexit (node:internal/child_process:291:12)
gyp ERR! System Darwin 22.1.0
gyp ERR! command "/opt/homebrew/Cellar/node/18.10.0/bin/node" "/opt/homebrew/Cellar/node/18.10.0/libexec/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "build" "--fallback-to-build" "--module=/Users/yourname/program/fqqk_blog_app/node_modules/canvas/build/Release/canvas.node" "--module_name=canvas" "--module_path=/Users/yourname/program/fqqk_blog_app/node_modules/canvas/build/Release" "--napi_version=8" "--node_abi_napi=napi" "--napi_build_version=0" "--node_napi_label=node-v108"
gyp ERR! cwd /Users/yourname/program/fqqk_blog_app/node_modules/canvas
gyp ERR! node -v v18.10.0
gyp ERR! node-gyp -v v9.1.0
gyp ERR! not ok
node-pre-gyp ERR! build error
node-pre-gyp ERR! stack Error: Failed to execute 'node-gyp build --fallback-to-build --module=/Users/yourname/program/fqqk_blog_app/node_modules/canvas/build/Release/canvas.node --module_name=canvas --module_path=/Users/yourname/program/fqqk_blog_app/node_modules/canvas/build/Release --napi_version=8 --node_abi_napi=napi --napi_build_version=0 --node_napi_label=node-v108' (1)
node-pre-gyp ERR! stack     at ChildProcess.<anonymous> (/Users/yourname/program/fqqk_blog_app/node_modules/node-pre-gyp/lib/util/compile.js:83:29)
node-pre-gyp ERR! stack     at ChildProcess.emit (node:events:513:28)
node-pre-gyp ERR! stack     at maybeClose (node:internal/child_process:1091:16)
node-pre-gyp ERR! stack     at ChildProcess._handle.onexit (node:internal/child_process:302:5)
node-pre-gyp ERR! System Darwin 22.1.0
node-pre-gyp ERR! command "/opt/homebrew/Cellar/node/18.10.0/bin/node" "/Users/yourname/program/fqqk_blog_app/node_modules/canvas/node_modules/.bin/node-pre-gyp" "install" "--fallback-to-build"
node-pre-gyp ERR! cwd /Users/yourname/program/fqqk_blog_app/node_modules/canvas
node-pre-gyp ERR! node -v v18.10.0
node-pre-gyp ERR! node-pre-gyp -v v0.11.0
node-pre-gyp ERR! not ok
Failed to execute 'node-gyp build --fallback-to-build --module=/Users/yourname/program/fqqk_blog_app/node_modules/canvas/build/Release/canvas.node --module_name=canvas --module_path=/Users/yourname/program/fqqk_blog_app/node_modules/canvas/build/Release --napi_version=8 --node_abi_napi=napi --napi_build_version=0 --node_napi_label=node-v108' (1)
info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.
```

## how to

調査する

https://github.com/Automattic/node-canvas/issues/1733
export npm_config_target_arch=x64  
brew doctor  
sudo xcode-select --switch /Applications/Xcode.app  
arch -arm64 brew install pkg-config cairo pango libpng jpeg giflib librsvg
CPLUS_INCLUDE_PATH=/opt/homebrew/include yarn add canvas@2.6.1

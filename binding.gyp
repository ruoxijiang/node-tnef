{
  "targets": [
    {
      "target_name": "tnef",
      "sources": [ "src/tnef.cc"],
      'include_dirs' : [ "<!@(node -p \"require('node-addon-api').include\")" ],
      'xcode_settings': { 'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
              'CLANG_CXX_LIBRARY': 'libc++',
              'MACOSX_DEPLOYMENT_TARGET': '10.7',
      },
      "dependencies": ["tnefLib"],
      "defines": ["HAVE_CONFIG_H=1","STDC_HEADERS=1","HAVE_STRING_H=1","HAVE_STRINGS_H=1"]
    },
    {
             "target_name": "tnefLib",
             "type": "static_library",
             "sources": [
             "src/vendor/tnef/src/node_native.c",
              "src/vendor/tnef/src/alloc.c",
               "src/vendor/tnef/src/attr.c",
                "src/vendor/tnef/src/date.c",
                "src/vendor/tnef/src/debug.c",
                 "src/vendor/tnef/src/file.c",
                  "src/vendor/tnef/src/mapi_attr.c",
             "src/vendor/tnef/src/mapi_types.c",
             "src/vendor/tnef/src/options.c",
              "src/vendor/tnef/src/path.c",
               "src/vendor/tnef/src/rtf.c",
               "src/vendor/tnef/src/tnef.c",
               "src/vendor/tnef/src/tnef_names.c",
               "src/vendor/tnef/src/tnef_types.c",
             "src/vendor/tnef/src/util.c",
              "src/vendor/tnef/src/write.c",
               "src/vendor/tnef/src/xstrdup.c"],
             "include_dirs": ["src/vendor/tnef/src","src/vendor/tnef/src/replace"],
             "defines": ["HAVE_CONFIG_H=1","STDC_HEADERS=1","HAVE_STRING_H=1","HAVE_STRINGS_H=1"]
        }
  ]
}

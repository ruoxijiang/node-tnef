#include "napi.h"
extern "C" {
#include "vendor/tnef/src/node_native.h"
#include "vendor/tnef/src/tnef.h"
}
namespace {
    Napi::Value ExtractFiles(const Napi::CallbackInfo &info) {
        Napi::Env env = info.Env();
        if (!info[0].IsString()) {
            Napi::TypeError::New(env, "Parameter 'file_name' must be a string").
                    ThrowAsJavaScriptException();
            return env.Null();
        }
        if (!info[1].IsString()) {
            Napi::TypeError::New(env, "Parameter 'dest' must be a string").
                    ThrowAsJavaScriptException();
            return env.Null();
        }
        File_List fileList;
        File_List tmp;
        const std::string file_name = info[0].As<Napi::String>();
        const std::string dest = info[1].As<Napi::String>();
        extract_files(file_name.c_str(), dest.c_str(), &fileList);
        Napi::Array ret = Napi::Array::New(env);
        int i =0;
        tmp = fileList;
            while(tmp != NULL) {
//                    Napi::Object fileInfo = Napi::Object::New(env);
//                fileInfo.Set(Napi::String::New(env, "name"), Napi::String::New(env, tmp->info.file_name));
//                fileInfo.Set(Napi::String::New(env, "path"), Napi::String::New(env, tmp->info.path));
//                fileInfo.Set(Napi::String::New(env, "contentType"),
//                            Napi::String::New(env, tmp->info.mime_type));
//                fileInfo.Set(Napi::String::New(env, "contentId"),
//                            Napi::String::New(env, tmp->info.content_id));
//                fileInfo.Set(Napi::String::New(env, "size"), Napi::Number::New(env, tmp->info.len));
//                    ret.Set(i, fileInfo);
                    tmp = tmp->next;
                i++;
            }
            free_file_list(&fileList);
        return ret;
    }

    Napi::Value GetFilesInfo(const Napi::CallbackInfo &info) {
        Napi::Env env = info.Env();
        if (!info[0].IsString()) {
            Napi::TypeError::New(env, "Parameter 'file_name' must be a string").
                    ThrowAsJavaScriptException();
            return env.Null();
        }
        if (!info[1].IsString()) {
            Napi::TypeError::New(env, "Parameter 'dest' must be a string").
                    ThrowAsJavaScriptException();
            return env.Null();
        }
        const std::string file_name = info[0].As<Napi::String>();
        const std::string dest = info[1].As<Napi::String>();
        Napi::Array ret = Napi::Array::New(env);
        Napi::Object file = Napi::Object::New(env);
        file.Set(Napi::String::New(env, "name"), Napi::String::New(env, ""));
        file.Set(Napi::String::New(env, "path"), Napi::String::New(env, ""));
        file.Set(Napi::String::New(env, "contentType"), Napi::String::New(env, ""));
        file.Set(Napi::String::New(env, "contentId"), Napi::String::New(env, ""));
        file.Set(Napi::String::New(env, "size"), Napi::Number::New(env, -1));
        int i = 0;
        ret.Set(i, file);
        return ret;
    }

    Napi::Object Init(Napi::Env env, Napi::Object exports) {
        exports.Set("ExtractFiles", Napi::Function::New(env, ExtractFiles));
        exports.Set("GetFilesInfo", Napi::Function::New(env, GetFilesInfo));
        return exports;
    }
}
NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)

// 
// 
// export class CodecDetection {
//     
//     
//     private static _VideoTypes:any = [
//         
//         new Codec("mp4", "video/mp4", "avc1.42E01E, mp4a.40.2"),
// 		new Codec("m4v", "video/mp4", "avc1.42E01E, mp4a.40.2"),
//         new Codec("ogv", "video/ogg", "theora, vorbis"),
// 		new Codec("webm", "video/webm", "vp8, vorbis"),
// 		new Codec("webmv", "video/webm", "vp8, vorbis"),
// 		new Codec("3gpp", "video/3gpp", "mp4v.20.8, samr")
//         
//     ];
//     
//     private static _AudioTypes:any = [
//         
// 		new Codec("mp3", "audio/mpeg", "mp3"),
// 		new Codec("m4a", "audio/mp4", "mp4a.40.2"),
// 		new Codec("ogg", "audio/ogg", "vorbis"),
// 		new Codec("oga", "audio/ogg", "vorbis"),
// 		new Codec("webma", "audio/webm", "vorbis"),
// 		new Codec("wav", "audio/wav", "1")
// 		
//     ];
//     
//     
//     private static _SupportedVideoCodecs:Codec[] = [];
//     private static _SupportedAudioCodec:Codec[] = [];
//     
//     
//     public static Init():void {
//         
//         
//         var videoTester:HTMLVideoElement = document.createElement("video");
//         
//         var i:number = 0;
//         var iCodec:Codec;
//         while(iCodec = CodecDetection._VideoTypes[i++]) {
//             
//             //console.log(iCodec.fileExt, videoTester.canPlayType(iCodec.toString()));
//             
//             if (typeof videoTester.canPlayType !== "undefined") {
//                 if (videoTester.canPlayType(iCodec.toString()) == "probably") {
//                     //console.log("ALLOWING ("+iCodec.fileExt+"): "+iCodec.toString());
//                     CodecDetection._SupportedVideoCodecs.push(iCodec);
//                 }
//             }
//         }
//         
//         
//         var audioTester:HTMLAudioElement = document.createElement("audio");
//         
//         i = 0;
//         //var iCodec:Codec;
//         while(iCodec = CodecDetection._AudioTypes[i++]) {
//             if (typeof audioTester.canPlayType !== "undefined") {
//                 if (audioTester.canPlayType(iCodec.toString()) == "probably") {
//                     CodecDetection._SupportedAudioCodec.push(iCodec);
//                 }
//             }
//         }
//         
//         
//     }
//     
//     
//     
//     
//     public static GetVideoCodec():Codec {
//         return CodecDetection._SupportedVideoCodecs[0];
//     }
//     
//     public static GetAudioCodec():Codec {
//         return CodecDetection._SupportedVideoCodecs[0];
//     }
//     
//     
//     
//     public static GetVideoCodecFor(fileExtensions:string[]):Codec {
//         
//         var f:number = 0,
//             fileExt:string,
//             i:number;
//         
//         while(f < fileExtensions.length) {
//             fileExt = fileExtensions[f];
//             
//             //console.log("checking "+fileExt);
//             
//             i = CodecDetection._SupportedVideoCodecs.length;
//             while(i--) {
//                 //console.log("checking "+fileExt+" == "+Codecs._SupportedVideoCodecs[i].fileExt);
//                 if (CodecDetection._SupportedVideoCodecs[i].fileExt == fileExt) {
//                     return CodecDetection._SupportedVideoCodecs[i];
//                 }
//             }
//             
//             f++;
//         }
//         
//         return null;
//     }
//     
//     
//     
//     
//     
//     public static GetSupportedVideo(files:string[]):string {
//         
//         var f:number = 0,
//             fileExt:string,
//             i:number;
//         
//         while(f < files.length) {
//             fileExt = StringUtility.GetFileExtension(files[f]);
//             
//             //console.log("checking "+fileExt);
//             
//             i = CodecDetection._SupportedVideoCodecs.length;
//             while(i--) {
//                 //console.log("checking "+fileExt+" == "+Codecs._SupportedVideoCodecs[i].fileExt);
//                 if (CodecDetection._SupportedVideoCodecs[i].fileExt == fileExt) {
//                     //return Codecs._SupportedVideoCodecs[i];
//                     return files[f];
//                 }
//             }
//             
//             f++;
//         }
//         
//         return null;
//     }
//     
//     
//     
//     
//     
// }
// 
// CodecDetection.Init();

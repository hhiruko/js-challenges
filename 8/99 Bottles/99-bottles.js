let bottles = 99;
let song = '♪ ';
while(bottles > 0){
    song += `${bottles} bottles of beer on the wall. ${bottles} bottles of beer. If one of the bottles just happen to fall, ${--bottles} bottles of beer on the wall. ♪ `;
}
song += "No more bottles of beer on the wall, no more bottles of beer. There's nothing else to fall, because there's no more bottles of beer on the wall. ♪";

console.log(song);
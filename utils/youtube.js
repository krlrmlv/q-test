export function getYoutubeId(url) {
  /** Get YouTube video ID from any type of video URL.
   ** Source: https://stackoverflow.com/questions/3452546
   **/
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url?.match(regExp)
  return match && match[7].length === 11 ? match[7] : url
}

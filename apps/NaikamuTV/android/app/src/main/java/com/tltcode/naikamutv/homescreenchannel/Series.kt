package com.tltcode.naikamutv.homescreenchannel

import com.facebook.react.bridge.ReadableMap

class WatchlistSeries(
    val id: String,
    val animeId: String,
    val title: String,
    val posterUri: String,
    // The duration is specified in the ISO 8601 format as 'PT00H00M'. For more information on the
    // format, refer - https://en.wikipedia.org/wiki/ISO_8601.
) {

    companion object {
        fun createSeriesEpisode(seriesObject: ReadableMap): WatchlistSeries {
            return WatchlistSeries(
                getStringOrThrow(seriesObject, "id"),
                getStringOrThrow(seriesObject, "animeId"),
                getStringOrThrow(seriesObject, "title"),
                getStringOrThrow(seriesObject, "poster"),
            )
        }

        private fun getStringOrThrow(seriesObject: ReadableMap, key: String): String {
            val value = seriesObject.getString(key)

            if (value === null) {
                throw Error("Key $key is required")
            }
            return value
        }

        private fun secondsToISO8601Duration(seconds: Int): String {
            val hours = seconds / 3600
            val minutes = (seconds % 3600) / 60

            return "PT${String.format("%02d", hours)}H${String.format("%02d", minutes)}M"
        }
    }
}

enum class VideoType {
    EPISODE,
    MOVIE
}

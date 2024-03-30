package com.tltcode.naikamutv.homescreenchannel

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.tvprovider.media.tv.PreviewChannelHelper
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray

@RequiresApi(Build.VERSION_CODES.O)
class TVChannel(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "AndroidTVChannel"

    @ReactMethod
    fun populateDefaultChannel(watchListSeries: ReadableArray) {
        val previewChannelHelper = PreviewChannelHelper(reactContext.applicationContext)
        val channelHelper = HomeScreenChannelHelper(previewChannelHelper)
        val channel = channelHelper.getDefaultChannel()

        if (channel === null) {
            throw Error("Default channel not created")
        }

        val videos = ArrayList<WatchListSeries>()

        for (i in 0 until watchListSeries.size()) {
            val seriesObject = watchListSeries.getMap(i)
            val series = WatchListSeries.createSeriesEpisode(seriesObject)
            videos.add(series)
        }

        Log.println(Log.DEBUG, "TVChannel", "populateDefaultChannel videos: $videos")

        channelHelper.addProgramsToChannel(videos, channel.id);
    }

    @ReactMethod
    fun createDefaultChannel() {
        val previewChannelHelper = PreviewChannelHelper(reactContext.applicationContext)
        val channelHelper = HomeScreenChannelHelper(previewChannelHelper)
        channelHelper.createHomeScreenDefaultChannel(reactContext.applicationContext)
    }

//    @SuppressLint("RestrictedApi")
//    @ReactMethod
//    fun addToContinueWatchingWatchNext(
//        id: String,
//        title: String,
//        posterUri: String,
//        watchTimeInS: Int
//    ) {
//        Log.println(
//            Log.DEBUG,
//            "TVChannel",
//            "addToContinueWatchingWatchNext id: $id, title: $title, posterUri: $posterUri, watchTimeInS: $watchTimeInS"
//        )
//
//        val channelHelper = PreviewChannelHelper(reactContext)
//
////        val program = movie.toPreviewProgram(channelId)
////        channelHelper.publishPreviewProgram(program)
//
//        val builder = WatchNextProgram.Builder()
//        builder.setType(TvContractCompat.WatchNextPrograms.TYPE_TV_EPISODE)
//            .setWatchNextType(TvContractCompat.WatchNextPrograms.WATCH_NEXT_TYPE_CONTINUE)
//            .setEpisodeNumber(1)
//            .setDurationMillis(watchTimeInS * 1000)
//            .setEpisodeTitle(title)
//            .setTitle(title)
//            .setLastPlaybackPositionMillis(0)
//            .setPosterArtUri(posterUri.toUri())
//            .setPosterArtAspectRatio(PreviewProgramColumns.ASPECT_RATIO_16_9)
//            .setIntentUri("naikamu://naikamu.com/movie/$id".toUri())
//            .setSeasonNumber(1)
//
//        val watchNextProgramUri = reactContext.applicationContext.contentResolver
//            .insert(
//                TvContractCompat.WatchNextPrograms.CONTENT_URI,
//                builder.build().toContentValues()
//            )
//    }

//    @SuppressLint("RestrictedApi")
//    @ReactMethod
//    fun addToContinueWatchingPreviewProgram(
//        id: String,
//        title: String,
//        posterUri: String,
//        watchTimeInS: Int
//    ) {
//        Log.println(
//            Log.DEBUG,
//            "TVChannel",
//            "addToContinueWatchingPreviewProgram id: $id, title: $title, posterUri: $posterUri, watchTimeInS: $watchTimeInS"
//        )
//
//        val channelHelper = PreviewChannelHelper(reactContext)
//
////        val program = movie.toPreviewProgram(channelId)
////        channelHelper.publishPreviewProgram(program)
//
//        val channelId = MMKV.defaultMMKV().decodeLong(channelStorageKey)
//
//        val program = PreviewProgram.Builder()
//            .setType(TvContractCompat.PreviewPrograms.TYPE_TV_EPISODE)
//            .setChannelId(channelId)
//            .setEpisodeNumber(1)
//            .setDurationMillis(watchTimeInS * 1000)
//            .setEpisodeTitle(title)
//            .setTitle(title)
//            .setLastPlaybackPositionMillis(0)
//            .setPosterArtUri(posterUri.toUri())
//            .setPosterArtAspectRatio(PreviewProgramColumns.ASPECT_RATIO_16_9)
//            .setIntentUri("naikamu://naikamu.com/movie/$id".toUri())
//            .setSeasonNumber(1)
////                .setInternalProviderId(movie.id.toString())
////                channelHelper.publishPreviewProgram(program)
//
////            var programUri =
//        reactContext.applicationContext.contentResolver.insert(
//            TvContractCompat.PreviewPrograms.CONTENT_URI,
//            program.build().toContentValues()
//        )
//    }
//
//    @SuppressLint("RestrictedApi")
//    @ReactMethod
//    fun addToContinueWatchingPreviewProgramWatchNext(
//        id: String,
//        title: String,
//        posterUri: String,
//        watchTimeInS: Int
//    ) {
//        Log.println(
//            Log.DEBUG,
//            "TVChannel",
//            "addToContinueWatchingPreviewProgramWatchNext id: $id, title: $title, posterUri: $posterUri, watchTimeInS: $watchTimeInS"
//        )
//
//        val channelHelper = PreviewChannelHelper(reactContext)
//
////        val program = movie.toPreviewProgram(channelId)
////        channelHelper.publishPreviewProgram(program)
//
//        val builder = WatchNextProgram.Builder()
//        builder.setType(TvContractCompat.WatchNextPrograms.TYPE_MOVIE)
//            .setWatchNextType(TvContractCompat.WatchNextPrograms.WATCH_NEXT_TYPE_CONTINUE)
//            .setLastEngagementTimeUtcMillis(watchTimeInS.toLong() * 1000)
//            .setTitle(title)
//            .setPosterArtUri(posterUri.toUri())
//            .setIntentUri("naikamu://naikamu.com/series/$id".toUri())
//
//        val watchNextProgramUri = reactContext.applicationContext.contentResolver
//            .insert(
//                TvContractCompat.WatchNextPrograms.CONTENT_URI,
//                builder.build().toContentValues()
//            )
//
//        val channelId = MMKV.defaultMMKV().decodeLong(channelStorageKey)
//
//        val program = PreviewProgram.Builder()
//            .setType(TvContractCompat.PreviewPrograms.TYPE_TV_EPISODE)
//            .setChannelId(channelId)
//            .setEpisodeNumber(1)
//            .setDurationMillis(watchTimeInS * 1000)
//            .setEpisodeTitle(title)
//            .setTitle(title)
//            .setLastPlaybackPositionMillis(0)
//            .setPosterArtUri(posterUri.toUri())
//            .setPosterArtAspectRatio(PreviewProgramColumns.ASPECT_RATIO_16_9)
//            .setIntentUri("naikamu://naikamu.com/movie/$id".toUri())
//            .setSeasonNumber(1)
////                .setInternalProviderId(movie.id.toString())
////                channelHelper.publishPreviewProgram(program)
//
////            var programUri =
//        reactContext.applicationContext.contentResolver.insert(
//            TvContractCompat.PreviewPrograms.CONTENT_URI,
//            program.build().toContentValues()
//        )
//    }
//
//    @ReactMethod
//    fun clearChannel() {
//        val channelId = MMKV.defaultMMKV().decodeLong(channelStorageKey)
//
//        Log.println(
//            Log.DEBUG,
//            "TVChannel",
//            "clearing channel $channelId"
//        )
//
//        reactContext.applicationContext.contentResolver.delete(
//            TvContractCompat.buildChannelUri(
//                channelId
//            ), null, null
//        )
//    }
}
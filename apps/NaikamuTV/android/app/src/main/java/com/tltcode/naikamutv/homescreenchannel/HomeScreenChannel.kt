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
class HomeScreenChannel(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "HomeScreenChannel"

    @ReactMethod
    fun populateDefaultChannel(watchListSeries: ReadableArray) {
        val previewChannelHelper = PreviewChannelHelper(reactContext.applicationContext)
        val channelHelper = HomeScreenChannelHelper(previewChannelHelper)
        val channel = channelHelper.getDefaultChannel()

        if (channel === null) {
            throw Error("Default channel not created")
        }

        channelHelper.clearChannel(reactContext.applicationContext, channel.id)

        val videos = ArrayList<WatchlistSeries>()

        for (i in 0 until watchListSeries.size()) {
            val seriesObject = watchListSeries.getMap(i)
            val series = WatchlistSeries.createSeriesEpisode(seriesObject)
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
}

package com.tltcode.naikamutv.homescreenchannel

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.tvprovider.media.tv.PreviewChannel
import androidx.tvprovider.media.tv.PreviewChannelHelper
import androidx.tvprovider.media.tv.PreviewProgram
import androidx.tvprovider.media.tv.TvContractCompat
import com.tltcode.naikamutv.R

/**
 * Helper class that simplifies interactions with the ATV home screen
 */
@RequiresApi(Build.VERSION_CODES.O)
class HomeScreenChannelHelper(private val previewChannelHelper: PreviewChannelHelper) {

    companion object {
        private const val DEFAULT_CHANNEL_ID = "DEFAULT_CHANNEL_ID"
        private const val DEFAULT_CHANNEL_LINK = "naikamutv://watchlist"
    }

    // Creates a new default home screen channel and returns its ID
    fun createHomeScreenDefaultChannel(context: Context): Long {
        val logo = BitmapFactory.decodeResource(
            context.resources,
            R.mipmap.ic_channel_default
        )
        val defaultChannel = PreviewChannel.Builder()
            .setDisplayName(context.getString(R.string.default_home_screen_channel_name))
            .setDescription(context.getString(R.string.default_home_screen_channel_description))
            .setAppLinkIntentUri(Uri.parse(DEFAULT_CHANNEL_LINK))
            .setInternalProviderId(DEFAULT_CHANNEL_ID)
            .setLogo(logo)
            .build()

        return previewChannelHelper.publishDefaultChannel(defaultChannel)
    }

    /**
     * Adds the passed [videos] to the PreviewChannel with [channelId]
     */
    @SuppressLint("RestrictedApi")
    fun addProgramsToChannel(videos: List<WatchlistSeries>, channelId: Long) {
        videos.forEach {
            addWatchlistToChannel(it, channelId)
        }
    }

    /**
     * Adds the passed [episode] to the PreviewChannel with [channelId]
     */
    @SuppressLint("RestrictedApi")
    fun addWatchlistToChannel(episode: WatchlistSeries, channelId: Long) {
        val program = PreviewProgram.Builder()
            .setType(TvContractCompat.PreviewPrograms.TYPE_TV_SERIES)
            .setChannelId(channelId)
            .setIntentUri(Uri.parse("naikamutv://watchlist/${episode.id}"))
            .setPosterArtAspectRatio(TvContractCompat.PreviewPrograms.ASPECT_RATIO_16_9)
            .setPosterArtUri(Uri.parse(episode.posterUri))
            .setTitle(episode.title)
            .setInternalProviderId(episode.id)
            .build()

        previewChannelHelper.publishPreviewProgram(program)
    }

    /**
     * Returns the PreviewChannel used as the default if available
     */
    fun getDefaultChannel(): PreviewChannel? {
        return getChannelByInternalProviderId(DEFAULT_CHANNEL_ID)
    }

    /**
     * Returns a PreviewChannel with [internalProviderId] if available
     */
    fun getChannelByInternalProviderId(internalProviderId: String): PreviewChannel? {
        return previewChannelHelper.allChannels.find { internalProviderId == it.internalProviderId }
    }

    fun clearChannel(context: Context, channelId: Long) {
        Log.println(Log.DEBUG, "HomeScreenChannelHelper", "Clearing channel $channelId")

        context.contentResolver.delete(
            TvContractCompat.buildPreviewProgramsUriForChannel(channelId),
            null,
            null
        )
    }
}

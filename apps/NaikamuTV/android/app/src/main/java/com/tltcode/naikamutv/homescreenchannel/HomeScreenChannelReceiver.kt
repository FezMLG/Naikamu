package com.tltcode.naikamutv.homescreenchannel

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import androidx.tvprovider.media.tv.PreviewChannelHelper

/**
 * BroadcastReceiver that initializes the home screen channel.
 *
 * When installed from the Play Store, the system will send out a broadcast for
 * INITIALIZE_PROGRAMS, which is meant to trigger a BroadcastReceiver that sets
 * up the home screen channel(s) like this one.
 *
 * To test this during development, you can trigger the broadcast with ADB:
 *
 * <code>
 * adb shell am broadcast -a android.media.tv.action.INITIALIZE_PROGRAMS -n com.android.tv.reference/.homescreenchannels.HomeScreenChannelReceiver
 * </code>
 */
class HomeScreenChannelReceiver : BroadcastReceiver() {

    companion object {
        private const val DEFAULT_CHANNEL_SIZE = 10
    }

    override fun onReceive(context: Context, intent: Intent) {
        // If your receiver handles more than one action, check intent.action for INITIALIZE_PROGRAMS
        // Since this receiver has a single purpose, it can just trigger the Worker
        Log.println(Log.DEBUG, "HomeScreenChannelWorker", "started")

        // The INITIALIZE_PROGRAMS broadcast will not be sent on older versions of Android TV,
        // but you can also check the Android OS version to avoid doing the work on versions of
        // Android TV that don't have home screen channels in case you manually trigger the Worker.
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            Log.println(
                Log.DEBUG,
                "HomeScreenChannelWorker",
                "Home screen channels are not supported before Android O; skipping work"
            )
            // Return success because this doesn't need to be triggered again
            return;
        }

        val previewChannelHelper = PreviewChannelHelper(context)
        val channelHelper = HomeScreenChannelHelper(previewChannelHelper)
        
        // Get or create the default channel
        channelHelper.getDefaultChannel()

        Log.println(
            Log.DEBUG,
            "HomeScreenChannelWorker",
            "Programs added, worker finished"
        )
    }
}

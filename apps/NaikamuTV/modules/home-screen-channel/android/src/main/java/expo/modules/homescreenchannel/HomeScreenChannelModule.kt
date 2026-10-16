package expo.modules.homescreenchannel

import android.os.Build
import android.util.Log
import androidx.tvprovider.media.tv.PreviewChannelHelper
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class HomeScreenChannelModule : Module() {
    private val context
        get() = appContext.reactContext?.applicationContext ?: throw Exceptions.ReactContextLost()

    override fun definition() = ModuleDefinition {
        Name("HomeScreenChannel")

        Function("populateDefaultChannel") { watchListSeries: List<WatchlistSeries> ->
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
                return@Function
            }

            val channelHelper = HomeScreenChannelHelper(PreviewChannelHelper(context))
            val channel = channelHelper.getDefaultChannel()
                ?: throw IllegalStateException("Default channel not created")

            channelHelper.clearChannel(context, channel.id)

            Log.println(Log.DEBUG, "TVChannel", "populateDefaultChannel videos: $watchListSeries")

            channelHelper.addProgramsToChannel(watchListSeries, channel.id)
        }

        Function("createDefaultChannel") {
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
                return@Function
            }

            val channelHelper = HomeScreenChannelHelper(PreviewChannelHelper(context))
            channelHelper.createHomeScreenDefaultChannel(context)
            Unit
        }
    }
}

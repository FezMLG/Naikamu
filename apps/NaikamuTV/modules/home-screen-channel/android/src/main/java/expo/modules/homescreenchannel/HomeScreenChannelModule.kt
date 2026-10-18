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

    // Home screen channels are only supported on Android O and newer
    private val isSupported
        get() = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O

    override fun definition() = ModuleDefinition {
        Name("HomeScreenChannel")

        Function("populateDefaultChannel") { watchListSeries: List<WatchlistSeries> ->
            if (isSupported) {
                val channelHelper = HomeScreenChannelHelper(PreviewChannelHelper(context))
                val channel = channelHelper.getDefaultChannel()
                    ?: throw IllegalStateException("Default channel not created")

                channelHelper.clearChannel(context, channel.id)

                Log.println(Log.DEBUG, "TVChannel", "populateDefaultChannel videos: $watchListSeries")

                channelHelper.addProgramsToChannel(watchListSeries, channel.id)
            }
        }

        Function("createDefaultChannel") {
            if (isSupported) {
                val channelHelper = HomeScreenChannelHelper(PreviewChannelHelper(context))
                channelHelper.createHomeScreenDefaultChannel(context)
            }
        }
    }
}

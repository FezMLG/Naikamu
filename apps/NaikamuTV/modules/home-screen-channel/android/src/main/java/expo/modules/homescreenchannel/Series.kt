package expo.modules.homescreenchannel

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.records.Required

class WatchlistSeries : Record {
    @Field
    @Required
    val id: String = ""

    @Field
    @Required
    val animeId: String = ""

    @Field
    @Required
    val title: String = ""

    @Field("poster")
    @Required
    val posterUri: String = ""

    override fun toString() =
        "WatchlistSeries(id=$id, animeId=$animeId, title=$title, posterUri=$posterUri)"
}

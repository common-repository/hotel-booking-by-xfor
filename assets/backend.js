"use strict";

const {__, _x, _n, _nx} = wp.i18n;

Scheduler.plugin(function(e) {
    e.locale = {
        date: {
            month_full: [
                __('January', 'hotel-booking-by-xfor'),
                __("February", 'hotel-booking-by-xfor'),
                __("March", 'hotel-booking-by-xfor'),
                __("April", 'hotel-booking-by-xfor'),
                __("May", 'hotel-booking-by-xfor'),
                __("June", 'hotel-booking-by-xfor'),
                __("July", 'hotel-booking-by-xfor'),
                __("August", 'hotel-booking-by-xfor'),
                __("September", 'hotel-booking-by-xfor'),
                __("October", 'hotel-booking-by-xfor'),
                __("November", 'hotel-booking-by-xfor'),
                __("December", 'hotel-booking-by-xfor')
            ],
            month_short: [
                __('Jan', 'hotel-booking-by-xfor'),
                __("Feb", 'hotel-booking-by-xfor'),
                __("Mar", 'hotel-booking-by-xfor'),
                __("Apr", 'hotel-booking-by-xfor'),
                __("May", 'hotel-booking-by-xfor'),
                __("Jun", 'hotel-booking-by-xfor'),
                __("Jul", 'hotel-booking-by-xfor'),
                __("Aug", 'hotel-booking-by-xfor'),
                __("Sep", 'hotel-booking-by-xfor'),
                __("Oct", 'hotel-booking-by-xfor'),
                __("Nov", 'hotel-booking-by-xfor'),
                __("Dec", 'hotel-booking-by-xfor')
            ],
            day_full: [
                __('Sunday', 'hotel-booking-by-xfor'),
                __("Monday", 'hotel-booking-by-xfor'),
                __("Tuesday", 'hotel-booking-by-xfor'),
                __("Wednesday", 'hotel-booking-by-xfor'),
                __("Thursday", 'hotel-booking-by-xfor'),
                __("Friday", 'hotel-booking-by-xfor'),
                __("Saturday", 'hotel-booking-by-xfor')
            ],
            day_short: [
                __('Sun', 'hotel-booking-by-xfor'),
                __("Mon", 'hotel-booking-by-xfor'),
                __("Tue", 'hotel-booking-by-xfor'),
                __("Wed", 'hotel-booking-by-xfor'),
                __("Thu", 'hotel-booking-by-xfor'),
                __("Fri", 'hotel-booking-by-xfor'),
                __("Sat", 'hotel-booking-by-xfor')
            ]
        },
        labels: {
            dhx_cal_today_button: __("Today", 'hotel-booking-by-xfor'),
            day_tab: __("Day", 'hotel-booking-by-xfor'),
            week_tab: __("Week", 'hotel-booking-by-xfor'),
            month_tab: __("Month", 'hotel-booking-by-xfor'),
            new_event: __("New event", 'hotel-booking-by-xfor'),
            icon_save: __("Save", 'hotel-booking-by-xfor'),
            icon_cancel: __("Cancel", 'hotel-booking-by-xfor'),
            icon_details: __("Details", 'hotel-booking-by-xfor'),
            icon_edit: __("Edit", 'hotel-booking-by-xfor'),
            icon_delete: __("Delete", 'hotel-booking-by-xfor'),
            confirm_closing: "",
            confirm_deleting: __("Event will be deleted permanently, are you sure?", 'hotel-booking-by-xfor'),
            section_description: __("Description", 'hotel-booking-by-xfor'),
            section_time: __("Time period", 'hotel-booking-by-xfor'),
            full_day: __("Full day", 'hotel-booking-by-xfor'),
            confirm_recurring: __("Do you want to edit the whole set of repeated events?", 'hotel-booking-by-xfor'),
            section_recurring: __("Repeat event", 'hotel-booking-by-xfor'),
            button_recurring: __("Disabled", 'hotel-booking-by-xfor'),
            button_recurring_open: __("Enabled", 'hotel-booking-by-xfor'),
            button_edit_series: __("Edit series", 'hotel-booking-by-xfor'),
            button_edit_occurrence: __("Edit occurrence", 'hotel-booking-by-xfor'),
            agenda_tab: __("Agenda", 'hotel-booking-by-xfor'),
            date: __("Date", 'hotel-booking-by-xfor'),
            description: __("Description", 'hotel-booking-by-xfor'),
            year_tab: __("Year", 'hotel-booking-by-xfor'),
            week_agenda_tab: __("Agenda", 'hotel-booking-by-xfor'),
            grid_tab: __("Grid", 'hotel-booking-by-xfor'),
            drag_to_create: __("Drag to create", 'hotel-booking-by-xfor'),
            drag_to_move: __("Drag to move", 'hotel-booking-by-xfor'),
            message_ok: __("OK", 'hotel-booking-by-xfor'),
            message_cancel: __("Cancel", 'hotel-booking-by-xfor'),
            next: __("Next", 'hotel-booking-by-xfor'),
            prev: __("Previous", 'hotel-booking-by-xfor'),
            year: __("Year", 'hotel-booking-by-xfor'),
            month: __("Month", 'hotel-booking-by-xfor'),
            day: __("Day", 'hotel-booking-by-xfor'),
            hour: __("Hour", 'hotel-booking-by-xfor'),
            minute: __("Minute", 'hotel-booking-by-xfor')
        }
    }
});

const store = new Vuex.Store({
    state: {
        settings: [],
        rooms: [],
        roomtypes: [],
        init_scheduler: false,
    },
    getters: {
        allSettings: (state) => state.settings,
        allRooms: (state) => state.rooms,
        allRoomTypes: (state) => state.roomtypes,
        initScheduler: (state) => state.init_scheduler,
    },
    mutations: {
        getSettings(state) {
            axios
                .get(ajaxurl + '?action=xfor_get_settings')
                .then(response => (state.settings = response.data))
                .catch(error => console.log(error));
        },
        storeSettings(state) {
            axios
                .post(ajaxurl + '?action=xfor_store_settings', {settings: state.settings, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .then(response => state.settings = response.data)
                .catch(error => console.log(error));
        },
        addCUR(state, tmp) {
            state.settings.CUR.push(tmp);
        },
        addPROMO(state, tmp) {
            state.settings.PROMO.push(tmp);
        },
        getRooms(state) {
            if (state.rooms.length === 0) {
                axios
                    .get(ajaxurl + '?action=xfor_get_rooms')
                    .then(response => (state.rooms = response.data))
                    .catch(error => console.log(error));
            }
        },
        getRoomTypes(state) {
            if (state.roomtypes.length === 0) {
                axios
                    .get(ajaxurl + '?action=xfor_get_room_types')
                    .then(response => (state.roomtypes = response.data))
                    .catch(error => console.log(error));
            }
        },
        addRoomType(state, tmp) {
            axios
                .post(ajaxurl + '?action=xfor_add_room_type', {tmp : tmp, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .then(response => (state.roomtypes = response.data))
                .catch(error => console.log(error));

            state.rooms = [];

            router.push('/room_types')
        },
        editRoomType(state, tmp) {
            axios
                .post(ajaxurl + '?action=xfor_edit_room_type', {tmp : tmp, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .then(response => (state.roomtypes = response.data))
                .catch(error => console.log(error));

            state.rooms = [];

            router.push('/room_types')
        },
        delRoomType(state, id) {
            axios
                .post(ajaxurl + '?action=xfor_del_room_type', {id: id, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .then(response => (state.roomtypes = response.data))
                .catch(error => console.log(error));

            state.rooms = [];

        },
        addRoom(state, tmp) {
            axios
                .post(ajaxurl + '?action=xfor_add_room', {tmp : tmp, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .then(response => state.rooms = response.data)
                .catch(error => console.log(error));
        },
        setInitScheduler(state, flag) {
            state.init_scheduler = flag;
        },
    },
    actions: {
        getSettings: ({commit}) => {
            commit("getSettings");
        },
        storeSettings: ({commit}) => {
            commit("storeSettings");
        },
        addCUR: ({commit}, tmp) => {
            commit("addCUR", tmp);
        },
        addPROMO: ({commit}, tmp) => {
            commit("addPROMO", tmp);
        },
        getRooms: ({commit}) => {
            commit("getRooms");
        },
        getRoomTypes: ({commit}) => {
            commit("getRoomTypes");
        },
        addRoomType: ({commit}, tmp) => {
            commit("addRoomType", tmp);
        },
        editRoomType: ({commit}, tmp) => {
            commit("editRoomType", tmp);
        },
        delRoomType: ({commit}, id) => {
            commit("delRoomType", id);
        },
        addRoom: ({commit}, tmp) => {
            commit("addRoom", tmp);
        },
        setInitScheduler: ({commit}, flag) => {
            commit("setInitScheduler", flag);
        },
    },
});

const Dashboard = {
    mounted() {

        scheduler.locale.labels.section_fullname = __('Fullname', 'hotel-booking-by-xfor');
        scheduler.locale.labels.section_email = __('Email', 'hotel-booking-by-xfor');
        scheduler.locale.labels.section_tel = __('Phone', 'hotel-booking-by-xfor');
        scheduler.locale.labels.section_room = __('Room', 'hotel-booking-by-xfor');
        scheduler.locale.labels.section_noty = __('Noty', 'hotel-booking-by-xfor');
        scheduler.locale.labels.section_status = __('Status', 'hotel-booking-by-xfor');
        scheduler.locale.labels.section_is_paid = __('Is paid', 'hotel-booking-by-xfor');
        scheduler.locale.labels.section_time = __('Date', 'hotel-booking-by-xfor');
        scheduler.xy.scale_height = 30;
        scheduler.config.details_on_create = true;
        scheduler.config.details_on_dblclick = true;
        scheduler.config.show_loading = true;
        scheduler.config.buttons_left = ["dhx_delete_btn"];
        scheduler.config.buttons_right = ["dhx_save_btn", "dhx_cancel_btn"];

        var roomsArr = scheduler.serverList("room");
        var roomTypesArr = scheduler.serverList("roomType");
        var roomStatusesArr = scheduler.serverList("roomStatus");
        var bookingStatusesArr = scheduler.serverList("bookingStatus");

        scheduler.config.lightbox.sections = [
            {map_to: "fullname", name: "fullname", type: "textarea", height: 30},
            {map_to: "email", name: "email", type: "textarea", height: 30},
            {map_to: "tel", name: "tel", type: "textarea", height: 30},
            {map_to: "noty", name: "noty", type: "textarea", height: 30},
            {map_to: "room", name: "room", type: "select", options: scheduler.serverList("currentRooms")},
            {map_to: "status", name: "status", type: "radio", options: bookingStatusesArr},
            {map_to: "is_paid", name: "is_paid", type: "checkbox", checked_value: 1, unchecked_value: 0},
            {map_to: "time", name: "time", type: "calendar_time"}
        ];


        scheduler.locale.labels.timeline_tab = 'Timeline';

        scheduler.createTimelineView({
            fit_events: true,
            name: "timeline",
            y_property: "room",
            render: 'tree',
            x_unit: "day",
            x_date: "%d",
            x_size: 31,
            dy: 32,
            event_dy: 'full',
            section_autoheight: false,
            round_position: true,
            y_unit: scheduler.serverList("currentRooms"),
            second_scale: {
                x_unit: "month",
                x_date: "%F"
            }
        })

        var headerHTML = "<div class='timeline_item_separator'></div>" +
            "<div class='timeline_item_cell'>" + __('Number', 'hotel-booking-by-xfor') + "</div>" +
            "<div class='timeline_item_separator'></div>" +
            "<div class='timeline_item_cell'>" + __('Type', 'hotel-booking-by-xfor') + "</div>" +
            "<div class='timeline_item_separator'></div>" +
            "<div class='timeline_item_cell room_status'>" + __('Status', 'hotel-booking-by-xfor') + "</div>";

        scheduler.locale.labels.timeline_scale_header = headerHTML;

        function findInArray(array, key) {
            for (var i = 0; i < array.length; i++) {
                if (key == array[i].key)
                    return array[i];
            }
            return null;
        }

        function getRoomType(key) {
            return findInArray(roomTypesArr, key).label;
        }

        function getRoomStatus(key) {
            return findInArray(roomStatusesArr, key);
        }

        function getRoom(key) {
            return findInArray(roomsArr, key);
        }

        scheduler.templates.timeline_scale_label = function (key, label, section) {
            var roomStatus = getRoomStatus(section.status);
            return ["<div class='timeline_item_separator'></div>",
                "<div class='timeline_item_cell'>" + label + "</div>",
                "<div class='timeline_item_separator'></div>",
                "<div class='timeline_item_cell'>" + getRoomType(section.type_id) + "</div>",
                "<div class='timeline_item_separator'></div>",
                "<div class='timeline_item_cell room_status'>",
                "<span class='room_status_indicator room_status_indicator_" + roomStatus.id + "'></span>",
                "<span class='status-label'>" + roomStatus.label + "</span>",
                "</div>"].join("");
        };

        scheduler.attachEvent("onBeforeViewChange", function (old_mode, old_date, mode, date) {
            var year = date.getFullYear();
            var month = (date.getMonth() + 1);
            var d = new Date(year, month, 0);
            var daysInMonth = d.getDate();
            var timeline = scheduler.getView('timeline');
            timeline.x_size = daysInMonth;
            return true;
        });

        scheduler.templates.event_class = function (start, end, event) {
            return "event_" + (event.status || "");
        };

        function getPaidStatus(isPaid) {
            return isPaid ? "💶" : "";
        }

        var eventDateFormat = scheduler.date.date_to_str("%d %M %Y");
        scheduler.templates.event_bar_text = function (start, end, event) {
            var paidStatus = getPaidStatus(event.is_paid);
            return [event.text + "<br />",
                "<div class='booking_paid booking-option'>" + paidStatus + "</div>"].join("");
        };

        scheduler.templates.tooltip_text = function (start, end, event) {
            var room = getRoom(event.room) || {label: ""};
            var html = [];
            html.push(__('Room', 'hotel-booking-by-xfor') + ": <b>" + room.label + "</b>");
            html.push(__('Check-in', 'hotel-booking-by-xfor') + ": <b>" + eventDateFormat(start) + "</b>");
            html.push(__('Check-out', 'hotel-booking-by-xfor') + ": <b>" + eventDateFormat(end) + "</b>");
            html.push(event.status + ", " + getPaidStatus(event.is_paid));
            return html.join("<br>")
        };

        scheduler.templates.lightbox_header = function (start, end, ev) {
            var formatFunc = scheduler.date.date_to_str('%d.%m.%Y');
            return formatFunc(start) + " - " + formatFunc(end);
        };

        scheduler.attachEvent("onEventCollision", function (ev, evs) {
            for (var i = 0; i < evs.length; i++) {
                if (ev.room != evs[i].room) continue;
                dhtmlx.message({
                    type: "error",
                    text: __('This room is already booked for this date.', 'hotel-booking-by-xfor')
                });
            }
            return true;
        });

        scheduler.attachEvent('onEventCreated', function (event_id) {
            var ev = scheduler.getEvent(event_id);
            ev.status = 1;
            ev.is_paid = false;
            ev.text = '';
        });

        scheduler.addMarkedTimespan({days: [0, 6], zones: "fullday", css: "timeline_weekend"});

        window.showRooms = function showRooms(value) {
            var currentRoomsArr = [];
            if (value == 'all') {
                scheduler.updateCollection("currentRooms", roomsArr.slice());
                return
            }
            for (var i = 0; i < roomsArr.length; i++) {
                if (value == roomsArr[i].type_id) {
                    currentRoomsArr.push(roomsArr[i]);
                }
            }
            scheduler.updateCollection("currentRooms", currentRoomsArr);
        };

        scheduler.attachEvent("onLoadEnd", function () {
            showRooms("all");

            var select = document.getElementById("room_filter");
            var selectHTML = ["<option value='all'>" + __('All', 'hotel-booking-by-xfor') + "</option>"];
            for (var i = 0; i < roomTypesArr.length; i++) {
                selectHTML.push("<option value='" + roomTypesArr[i].key + "'>" + getRoomType(roomTypesArr[i].key) + "</option>");
            }
            select.innerHTML = selectHTML.join("");
        });


        scheduler.attachEvent("onEventSave", function (id, ev, is_new) {
            if (!ev.fullname) {
                dhtmlx.alert(__('Full name is required!', 'hotel-booking-by-xfor'));
                return false;
            }
            return true;
        });

        scheduler.clearAll();
        scheduler.init('scheduler_here', new Date(), "timeline");
        scheduler.load(ajaxurl + "?action=xfor_dashboard", "json");
        if (typeof window.dp == 'undefined') {
            window.dp = new dataProcessor(ajaxurl + "?action=xfor_dashboard");
            dp.init(scheduler);
            // disable style updates on add/upd/del
            dp.styles = "";
        }


    },
    template: `<div>
        <div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:600px;'>
            <div class="dhx_cal_navline">
                <div style="font-size:16px;padding:4px 20px;">
                    ${__('Filter by Type', 'hotel-booking-by-xfor')}:
                    <select id="room_filter" onchange='showRooms(this.value)'></select>
                </div>
                <div class="dhx_cal_prev_button">&nbsp;</div>
                <div class="dhx_cal_next_button">&nbsp;</div>
                <div class="dhx_cal_today_button"></div>
                <div class="dhx_cal_date"></div>
            </div>
            <div class="dhx_cal_header"></div>
            <div class="dhx_cal_data"></div>
        </div>
    </div>`
}

const RoomTypes = {
    mounted() {
        this.$store.dispatch('getRoomTypes')
    },
    methods: {
        delRoomType(id) {
            this.$store.dispatch('delRoomType', id)
        }
    },
    template: `<div>
        <router-link to="/room_types/add" class="button button-primary float-right">
           <span class="dashicons dashicons-plus lh32"></span>
        </router-link>
        <h3>${__('Room Types', 'hotel-booking-by-xfor')}</h3>
        <table class="widefat striped">
            <thead>
            <tr>
                <th>${__('Photo', 'hotel-booking-by-xfor')}</th>
                <th>${__('Name', 'hotel-booking-by-xfor')}</th>
                <th>${__('Capacity', 'hotel-booking-by-xfor')}</th>
                <th>${__('Price', 'hotel-booking-by-xfor')}</th>
                <th style="width:50px"></th>
                <th style="width:50px"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in store.getters.allRoomTypes">
                <td class="align-middle">
                    <img style="width:100%" :src="item.images" />
                </td>
                <td class="align-middle">
                    {{ item.shortcode }} -  
                    <b>{{ item.title }}</b>, {{ item.area }} ${__('m', 'hotel-booking-by-xfor')}<sup>2</sup>
                    <br/>
                    <span v-html="item.desc"></span>
                    <div>
                        <b>${__('Services', 'hotel-booking-by-xfor')}: </b>
                        {{ item.add_services_list }}
                    </div>
                    <div>
                        <b>${__('Comfort', 'hotel-booking-by-xfor')}: </b>
                        {{ item.comfort_list }}
                    </div>
                </td>
                <td class="align-middle">
                    <div v-for="(cap, ci ) in JSON.parse(item.capacity)">
                     {{ cap ? ci : '' }}
                    </div>
                </td>
                <td class="align-middle">
                    <div v-for="(cap, ci ) in JSON.parse(item.capacity)">
                     {{ cap }}
                    </div>
                </td>
                <td style="text-align:right;">
                    <router-link :to="{path: '/room_types/edit/'+item.id}" tag="button" class="button button-primary button-small button-edit">
                        <span class="dashicons dashicons-edit" style="line-height: 24px;"></span>
                    </router-link>
                </td>
                <td style="text-align:right;">
                    <button @click="delRoomType(item.id)" type="button" class="button button-primary button-small button-delete">
                        <span class="dashicons dashicons-trash" style="line-height: 24px;"></span>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>`
}

const AddRoomType = {
    data() {
        return {
            files: [],
            postAction: ajaxurl + '?action=xfor_upload_images',
            tmpRoomType: {
                id: null,
                shortcode: '',
                images: [],
                title: '',
                area: '',
                capacity_text: '',
                add_services: [],
                price: {},
                photos: '',
                comfort_list: [],
                desc: '',
            },
        }
    },
    methods: {
        addRoomType() {
            this.$store.dispatch("addRoomType", this.tmpRoomType);
        },
        editRoomType() {
            this.$store.dispatch("editRoomType", this.tmpRoomType);
        },
        inputFile: function (newFile, oldFile) {
            if (newFile && oldFile && !newFile.active && oldFile.active) {
                // Get response data
                console.log('response', newFile.response)
                if (newFile.xhr) {
                    //  Get the response status code
                    console.log('status', newFile.xhr.status)

                    this.files = [];

                    if (this.$route.params.id !== undefined) {
                        this.getRoomType();

                    } else {
                        this.getRoomTypeImages();
                    }

                    this.$store.state.roomtypes = [];
                }
            }
            // Automatic upload
            if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                if (!this.$refs.upload.active) {
                    this.$refs.upload.active = true
                }
            }
        },
        inputFilter: function (newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                // Filter non-image file
                if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
                    return prevent()
                }
            }

            // Create a blob field
            newFile.blob = ''
            let URL = window.URL || window.webkitURL
            if (URL && URL.createObjectURL) {
                newFile.blob = URL.createObjectURL(newFile.file)
            }
        },
        getRoomType() {
            let id = this.$route.params.id;

            axios
                .post(ajaxurl + '?action=xfor_get_room_type', {id: id, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .then(response => (this.tmpRoomType = response.data))
                .catch(error => console.log(error));
        },
        getRoomTypeImages() {
            var id = 0;
            if (this.$route.params.id !== undefined) {
                id = this.$route.params.id
            }

            axios
                .post(ajaxurl + '?action=xfor_get_room_type_images', {id: id, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .then(response => (this.tmpRoomType.images = response.data))
                .catch(error => console.log(error));
        },
        deletePhoto(index) {
            var id = 0;
            if (this.$route.params.id !== undefined) {
                id = this.$route.params.id
            }
            axios
                .post(ajaxurl + '?action=xfor_delete_image', {id: id, index: index, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .catch(error => console.log(error));

            this.$store.state.roomtypes = [];
        },
    },
    mounted: function () {
        if (this.$route.params.id !== undefined) {
            this.tmpRoomType.id = this.$route.params.id
            this.getRoomType();
        } else {
            this.getRoomTypeImages();
        }
    },
    template: `<div>
        <router-link to="/room_types" class="button button-primary float-right">
           <span class="dashicons dashicons-menu lh32"></span>
        </router-link>
        <h3>${__('Add Room Type', 'hotel-booking-by-xfor')}</h3>
        <input type="text" v-model="tmpRoomType.shortcode" placeholder="${__('Shortcode', 'hotel-booking-by-xfor')}">
        <input type="text" v-model="tmpRoomType.title" placeholder="${__('Title', 'hotel-booking-by-xfor')}">
        <input type="text" v-model="tmpRoomType.area" style="width:80px;" placeholder="${__('Area', 'hotel-booking-by-xfor')}"> ${__('m', 'hotel-booking-by-xfor')}<sup>2</sup>
        <input type="text"  v-model="tmpRoomType.capacity_text" placeholder="${__('Capacity text', 'hotel-booking-by-xfor')}">
        <div style="clear:both; margin-bottom:15px;"></div>
        <h4 style="margin-bottom:5px;">${__('Additional Services', 'hotel-booking-by-xfor')}</h4>
        <label style="margin-right:15px;" v-for="item in store.getters.allSettings.SERVICES_LIST">
        <input type="checkbox" v-model="tmpRoomType.add_services" :value="item"> 
            {{ item }}
        </label>
        <div style="clear:both; margin-bottom:15px;"></div>
        <div style="width:25%; float:left">
           <h4 style="margin-bottom:5px; margin-top:0;">${__('Price', 'hotel-booking-by-xfor')}</h4>
           <div style="margin-bottom:5px" v-for="(item, index) in store.getters.allSettings.SETS_LIST">
              <div style="width:100px; float:left;">
                 <input v-model="tmpRoomType.price[item]" style="width:90%" type="text" placeholder="${__('Price', 'hotel-booking-by-xfor')}">
              </div>
              <div style="width:100px; float:left; line-height:30px;">
                 {{ item }}
              </div>
              <div style="clear:both;"></div>
           </div>
        </div>
       <div style="width:75%; float:right">
          <h4 style="margin-bottom:5px;  margin-top:0">${__('Photos', 'hotel-booking-by-xfor')}</h4>
          
          <div v-show="tmpRoomType.images">
                <div v-for="(src, src_index) in tmpRoomType.images" style="float:left; margin-right:5px;position:relative;">
                    <button @click="deletePhoto(src_index); tmpRoomType.images.splice(src_index, 1)" type="button" class="button button-small" style="position:absolute; top:0; right:0; background: rgb(220, 50, 50); border: 1px solid rgb(220, 50, 50); color:#fff;">x</button>
                    <img :src="src" />
                </div>
                <div style="clear:both"></div>
          </div>
          
          <ul>
            <li v-for="file in files">
                {{file.name}} <span class="progress" v-if="file.active || file.progress !== '0.00'">- {{file.progress}}% </span>
            </li>
          </ul>
          <file-upload
            :data="{id: tmpRoomType.id, _ajax_nonce: hotel_booking_by_xfor.nonce}"
            class="button"
            ref="upload"
            v-model="files"
            :multiple="true"
            accept="image/png,image/gif,image/jpeg,image/webp"
            :post-action="postAction"
            @input-file="inputFile"
            @input-filter="inputFilter"
          >
          ${__('Upload photos', 'hotel-booking-by-xfor')}
          </file-upload>
       </div>
        <div style="clear:both; margin-bottom:15px;"></div>
        <div style="width:50%; float:left">
            <h4 style="margin-bottom:0; margin:5px 0;">${__('Comfort', 'hotel-booking-by-xfor')}</h4>
            <label style="margin-right:15px; float:left; width:25%;" v-for="item in store.getters.allSettings.COMFORTS_LIST">
            <input type="checkbox" v-model="tmpRoomType.comfort_list" :value="item" checked=""> {{ item }}
            </label>
        </div>
        <div style="width:50%; float:left">
            <h4 style="margin-bottom:0; margin:5px 0;">${__('Description', 'hotel-booking-by-xfor')}</h4>
            <textarea rows="3" v-model="tmpRoomType.desc" placeholder="Description" style="width:100%"></textarea>
        </div>
        <div style="clear:both; margin-bottom:10px;"></div>
        <div v-if="$route.params.id !== undefined">
        <button type="button" @click="editRoomType" class="button button-primary">
            ${__('Save', 'hotel-booking-by-xfor')}
        </button>
        </div>
        <div v-else>
        <button type="button" @click="addRoomType" class="button button-primary">
            ${__('Add', 'hotel-booking-by-xfor')}
        </button>
        </div>
    </div>`
}

const Rooms = {
    data() {
        return {
            tmpRoom: {
                name: '',
                type_id: '',
                cleaner: '',
                status: 1,
            },
        }
    },
    mounted() {
        this.$store.dispatch('getRooms')
    },
    methods: {
        addRoom() {
            this.$store.dispatch("addRoom", this.tmpRoom);
            jQuery('#TB_closeWindowButton').click();
        },
        delRoom(id, index0, index1) {

            axios
                .post(ajaxurl + '?action=xfor_delete_room', {id: id, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .catch(error => console.log(error));

            Vue.delete(this.$store.state.rooms[index0], index1)

        },
        switchRoomStatus(id, status) {
            axios
                .post(ajaxurl + '?action=xfor_switch_room_status', {id: id, status: status, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .catch(error => console.log(error));
        },
        updateRoom(id, cleaner) {
            axios
                .post(ajaxurl + '?action=xfor_update_room', {id: id, cleaner: cleaner, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .catch(error => console.log(error));
        }
    },
    template: `<div>
        <a href="#TB_inline?width=500&height=45&inlineId=modal-window-add" class="button button-primary thickbox float-right">
            <span class="dashicons dashicons-plus lh32"></span>
        </a>
        <div id="modal-window-add" style="display:none;">
            <div style=" padding-top:5px;">
                <input type="text" placeholder="Title" v-model="tmpRoom.name">
                <select v-model="tmpRoom.type_id">
                    <option v-for="(option, index) in store.getters.allRooms" :value="index.split('|')[1]">{{ index.split('|')[0] }}</option>
                </select>
                <select v-model="tmpRoom.cleaner">
                    <option v-for="option in store.getters.allSettings.ROOM_STATUSES" :value="option">{{ option }}</option>
                </select>
                <select v-model="tmpRoom.status">
                    <option value="1">${__('on', 'hotel-booking-by-xfor')}</option>
                    <option value="0">${__('off', 'hotel-booking-by-xfor')}</option>
                </select>
                <button type="button" class="button button-primary" @click="addRoom">
                    ${__('Add New Room', 'hotel-booking-by-xfor')}
                </button>
            </div>
        </div>
        <h3>${__("Rooms", 'hotel-booking-by-xfor')}</h3>
        <div class="row">
            <div class="column" v-for="(room, index0) in store.getters.allRooms">
                <table class="widefat striped">
                <thead>
                <tr>
                    <th colspan="5">
                        <h4 style="margin:0">{{ index0.split('|')[0] }}</h4>
                    </th>
                </tr>
                <tr>
                    <th>${__('Room', 'hotel-booking-by-xfor')}</th>
                    <th>${__('Cleaning', 'hotel-booking-by-xfor')}</th>
                    <th style="width:50px"></th>
                    <!-- <th style="width:50px"></th> -->
                    <th style="width:50px"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index1) in room">
                    <td>
                        {{ item.name }}
                    </td>
                    <td>
                        <select v-model="item.cleaner" @change="updateRoom(item.id, item.cleaner)">
                            <option v-for="option in store.getters.allSettings.ROOM_STATUSES" :value="option">{{ option }}</option>
                        </select>
                    </td>
                    <td style="text-align:right;">
                        <span v-if="item.status == 1">
                            <button @click="switchRoomStatus(item.id, item.status); item.status = 0" type="button" class="button button-primary button-small" style="background:#46B450; border:1px solid #46B450">
                                <span class="dashicons dashicons-visibility" style="line-height: 24px;"></span>
                            </button>
                        </span>
                        <span v-else>
                            <button @click="switchRoomStatus(item.id, item.status); item.status = 1" type="button" class="button button-primary button-small" style="background:#ccc; border:1px solid #ccc">
                                <span class="dashicons dashicons-visibility" style="line-height: 24px;"></span>
                            </button>
                        </span>
                    </td>
                    <td style="text-align:right;">
                        <button @click="delRoom(item.id, index0, index1)" type="button" class="button button-primary button-small button-delete">
                            <span class="dashicons dashicons-trash" style="line-height: 24px;"></span>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>`
}

const Orders = {
    data() {
        return {
            orders: {},
        };
    },
    methods: {
        delOrder(id, index) {
            axios
                .post(ajaxurl + '?action=xfor_delete_order', {'id': id, _ajax_nonce: hotel_booking_by_xfor.nonce})
                .catch(error => console.log(error));

            this.orders.splice(index, 1)
        },
        getOrder() {
            axios
                .get(ajaxurl + '?action=xfor_get_orders')
                .then(response => (this.orders = response.data))
                .catch(error => console.log(error));
        },
    },
    mounted() {
        this.getOrder()
    },
    template: `<div>
        <h3>${__("Orders", 'hotel-booking-by-xfor')}</h3>
        <table class="widefat striped">
            <thead>
            <tr>
                <th>#</th>
                <th>${__('Customer', 'hotel-booking-by-xfor')}</th>
                <th>${__('Phone', 'hotel-booking-by-xfor')}</th>
                <th>${__('Room', 'hotel-booking-by-xfor')}</th>
                <th style="width:200px;">${__('Check-in', 'hotel-booking-by-xfor')} - ${__('Check-out', 'hotel-booking-by-xfor')}</th>
                <th>${__('Price', 'hotel-booking-by-xfor')}</th>
                <th>${__('Status', 'hotel-booking-by-xfor')}</th>
                <th style="width:50px"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in orders">
                 <td>{{ item.id }}</td>
                <td>
                    {{ item.fullname }}<br>
                    ${__('Email', 'hotel-booking-by-xfor')}: {{ item.email }} <br>${__('Noty', 'hotel-booking-by-xfor')}: {{ item.noty }}
                </td>
                <td>
                    {{ item.tel }}
                </td>
                <td>
                   {{ item.room }}
                </td>
                <td>
                    {{ item.start_date }} - {{ item.end_date }}
                </td>
                <td>
                    {{ item.cost }}
                </td>
                <td>
                     {{ item.status }} - {{ item.is_paid === 1 ? 'Is paid' : 'Not paid' }}
                </td>
                <td style="text-align:right;">
                    <a href="#" @click="delOrder(item.id, index)" class="button button-primary button-small button-delete">
                        <span class="dashicons dashicons-trash" style="line-height: 24px"></span>
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
        </div>`
}

const Settings = {
    data() {
        return {
            tmpCur: {},
            tmpPromo: {},
        }
    },
    methods: {
        changeData() {
            this.$store.dispatch("storeSettings");
        },
        addNewCur() {
            this.$store.dispatch("addCUR", this.tmpCur);
            this.tmpCur = {};
            this.changeData();
        },
        addNewPromo() {
            this.$store.dispatch("addPROMO", this.tmpPromo);
            this.tmpPromo = {};
            this.changeData();
        }
    },
    template: `<div>
            <h3>${__('Settings', 'hotel-booking-by-xfor')}</h3>
            <div style="width:66%; float:left;">
                <table class="widefat striped">
                    <tr>
                        <th>${__('Room Statuses', 'hotel-booking-by-xfor')}</th>
                        <td>
                            <input-tag v-model="store.getters.allSettings.ROOM_STATUSES" @input="changeData" :add-tag-on-blur="true"></input-tag>
                        </td>
                    </tr>
                    <tr>
                        <th>${__('Booking Statuses', 'hotel-booking-by-xfor')}</th>
                        <td>
                            <input-tag v-model="store.getters.allSettings.BOOKING_STATUS" @input="changeData" :add-tag-on-blur="true"></input-tag>
                        </td>
                    </tr>
                    <tr>
                        <th>${__('Comforts List', 'hotel-booking-by-xfor')}</th>
                        <td>
                            <input-tag v-model="store.getters.allSettings.COMFORTS_LIST" @input="changeData" :add-tag-on-blur="true"></input-tag>
                        </td>
                    </tr>
                    <tr>
                        <th>${__('Services List', 'hotel-booking-by-xfor')}</th>
                        <td>
                            <input-tag v-model="store.getters.allSettings.SERVICES_LIST" @input="changeData" :add-tag-on-blur="true"></input-tag>
                        </td>
                    </tr>
                    <tr>
                        <th>${__('Sets List', 'hotel-booking-by-xfor')}</th>
                        <td>
                            <input-tag v-model="store.getters.allSettings.SETS_LIST" @input="changeData" :add-tag-on-blur="true"></input-tag>
                        </td>
                    </tr>
                    <tr>
                        <th><label>${__('Room Images', 'hotel-booking-by-xfor')}, px</label></th>
                        <td>
                            ${__('Large', 'hotel-booking-by-xfor')}
                            <input style="width:100px; margin-right:15px;" type="number" @input="changeData" v-model="store.getters.allSettings.IMG_LARGE">
                            ${__('Medium', 'hotel-booking-by-xfor')}
                            <input style="width:100px; margin-right:15px;" type="number" @input="changeData" v-model="store.getters.allSettings.IMG_MEDIUM">
                            ${__('Small', 'hotel-booking-by-xfor')}
                            <input style="width:100px;" type="number" @input="changeData" v-model="store.getters.allSettings.IMG_SMALL">
                        </td>
                    </tr>
                </table>

            </div>
            <div style="width:32%; float:left; margin-left:1%;">
                <table class='widefat'>
                    <thead>
                        <tr>
                            <th>${__('Currencies', 'hotel-booking-by-xfor')}</th>
                            <th>${__('Sign', 'hotel-booking-by-xfor')}</th>
                            <th>${__('Coef', 'hotel-booking-by-xfor')}</th>
                            <th style="width:30px; text-align: center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(rowList, index0) in store.getters.allSettings.CUR">
                          <td v-for="(item, index1) in rowList" @change="changeData"><input type="text" style="width:100%;" :value="item" v-model="store.getters.allSettings.CUR[index0][index1]"></td>
                          <td><button @click="store.getters.allSettings.CUR.splice(index0, 1);changeData()" class="button" style="background: #DC3232;color: #fff; line-height: normal; border-color:#DC3232;" type="submit"><span class="dashicons dashicons-trash"></span></button></td>
                        </tr>
                    </tbody>
                    <tr style="background:#f0f6fc;">
                        <td><input v-model="tmpCur[0]" type="text" style="width:100%;" placeholder="${__('Currency', 'hotel-booking-by-xfor')}" ></td>
                        <td><input v-model="tmpCur[1]" type="text" style="width:100%;" placeholder="${__('Sign', 'hotel-booking-by-xfor')}" ></td>
                        <td><input v-model="tmpCur[2]" type="text" style="width:100%;" placeholder="${__('Coef', 'hotel-booking-by-xfor')}" ></td>
                        <td><button @click="addNewCur" class="button-primary button" style="line-height: normal;" type="button"><span class="dashicons dashicons-plus"></span></button></td>
                    </tr>
                </table>

                <br/>

                <table class='widefat'>
                    <thead>
                    <tr>
                        <th>${__('Promocodes', 'hotel-booking-by-xfor')}</th>
                        <th>${__('Sum', 'hotel-booking-by-xfor')}</th>
                        <th>${__('Status', 'hotel-booking-by-xfor')}</th>
                        <th style="width:30px; text-align: center"></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(rowList, index0) in store.getters.allSettings.PROMO">
                          <td v-for="(item, index1) in rowList" @change="changeData"><input type="text" style="width:100%;" :value="item" v-model="store.getters.allSettings.PROMO[index0][index1]"></td>
                          <td><button  @click="store.getters.allSettings.PROMO.splice(index0, 1);changeData()" class="button" style="background: #DC3232;color: #fff; line-height: normal; border-color:#DC3232;" type="submit"><span class="dashicons dashicons-trash"></span></button></td>
                        </tr>
                    </tbody>
                    <tr style="background:#f0f6fc;">
                        <td><input v-model="tmpPromo[0]" type="text" style="width:100%;" placeholder="${__('Promocode', 'hotel-booking-by-xfor')}" ></td>
                        <td><input v-model="tmpPromo[1]" type="text" style="width:100%;" placeholder="${__('Sum', 'hotel-booking-by-xfor')}" ></td>
                        <td><input v-model="tmpPromo[2]" type="text" style="width:100%;" placeholder="${__('Status', 'hotel-booking-by-xfor')}" ></td>
                        <td><button @click="addNewPromo" class="button-primary button" style="line-height: normal;" type="button"><span class="dashicons dashicons-plus"></span></button></td>
                    </tr>
                </table>

            </div>
        </div>`
}

NProgress.configure({parent: '#hotel_bookin_xfor'});

axios.interceptors.request.use(config => {
    NProgress.start()
    jQuery('#block').css('display', 'block')
    return config
})

axios.interceptors.response.use(response => {
    NProgress.done()
    jQuery('#block').css('display', 'none')
    return response
})

const router = new VueRouter({
    routes: [
        {path: "/", component: Dashboard,},
        {path: "/room_types", component: RoomTypes,},
        {path: "/rooms", component: Rooms,},
        {path: "/orders", component: Orders,},
        {path: '/room_types/add', component: AddRoomType},
        {path: '/room_types/edit/:id', component: AddRoomType},
        {path: "/settings", component: Settings,},
    ]
});

Vue.component('input-tag', vueInputTag.default)
Vue.component('file-upload', VueUploadComponent)

if (document.getElementById("hotel_bookin_xfor")) {

    new Vue({
        router,
        store,
        el: '#hotel_bookin_xfor',
        data() {
            return {
                settings: {},
            }
        },
        mounted() {
            this.$store.dispatch('getSettings')
        },
    });

}

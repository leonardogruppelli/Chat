<template>
  <div class="recent q-px-md">
    <p class="text-subtitle2 q-mb-sm">
      Recent conversations
    </p>

    <q-list>
      <q-item class="q-px-none">
        <q-item-section
          top
          avatar
        >
          <q-avatar
            size="50px"
            class="overflow-hidden"
          >
            <background />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-medium">
            John Doe
          </q-item-label>
          <q-item-label
            caption
            lines="2"
          >
            Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
          </q-item-label>
        </q-item-section>

        <q-item-section
          side
          top
        >
          <q-item-label caption>
            5 min ago
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-px-none">
        <q-item-section
          top
          avatar
        >
          <q-avatar
            size="50px"
            class="overflow-hidden"
          >
            <background />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-medium">
            Foo Bar
          </q-item-label>
          <q-item-label
            caption
            lines="2"
          >
            Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
          </q-item-label>
        </q-item-section>

        <q-item-section
          side
          top
        >
          <q-item-label caption>
            yesterday
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-px-none">
        <q-item-section
          top
          avatar
        >
          <q-avatar
            size="50px"
            class="overflow-hidden"
          >
            <background />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-medium">
            Tina Doe
          </q-item-label>
          <q-item-label
            caption
            lines="2"
          >
            Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
          </q-item-label>
        </q-item-section>

        <q-item-section
          side
          top
        >
          <q-item-label caption>
            10/02/2020
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-px-none">
        <q-item-section
          top
          avatar
        >
          <q-avatar
            size="50px"
            class="overflow-hidden"
          >
            <background />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-medium">
            Victoria Baz
          </q-item-label>
          <q-item-label
            caption
            lines="2"
          >
            Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
          </q-item-label>
        </q-item-section>

        <q-item-section
          side
          top
        >
          <q-item-label caption>
            02/02/2020
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-px-none">
        <q-item-section
          top
          avatar
        >
          <q-avatar
            size="50px"
            class="overflow-hidden"
          >
            <background />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-medium">
            Merol Muspi
          </q-item-label>
          <q-item-label
            caption
            lines="2"
          >
            Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
          </q-item-label>
        </q-item-section>

        <q-item-section
          side
          top
        >
          <q-item-label caption>
            01/02/2020
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import Background from 'components/background'

export default {
	components: {
		Background,
	}
}
</script>
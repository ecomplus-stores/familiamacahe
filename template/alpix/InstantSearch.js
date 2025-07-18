import {
  i19close,
  i19items,
  i19search,
  i19searchProducts,
  i19seeAll
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'
import ABackdrop from '@ecomplus/storefront-components/src/ABackdrop.vue'
import SearchEngine from '@ecomplus/storefront-components/src/SearchEngine.vue'


export default {
  name: 'InstantSearch',

  components: {
    ABackdrop,
    SearchEngine
  },

  props: {
    term: {
      type: String,
      default: ''
    },
    isVisible: {
      type: Boolean,
      default: false // Mudança: começar como false
    },
    pageSize: {
      type: Number,
      default: 8
    },
    autoFixScore: {
      type: Number,
      default: 0.83
    },
    searchEngineProps: Object,
    productCardProps: {
      type: Object,
      default () {
        return {
          isSmall: true
        }
      }
    }
  },

  data () {
    return {
      localTerm: this.term,
      searchTriggerTimer: null,
      searchTerm: '',
      history: [],
      totalSearchResults: 0,
      isSearching: false,
      hasSearched: false,
      searchInputListeners: null,
      currentInputElement: null
    }
  },

  computed: {
    i19close: () => i18n(i19close),
    i19items: () => i18n(i19items),
    i19search: () => i18n(i19search),
    i19searchProducts: () => i18n(i19searchProducts),
    i19seeAll: () => i18n(i19seeAll)
  },

  mounted() {
    console.log('Component mounted')
    let self = this
    
    $('.search-shelf input, input[name="term"], .search-input, .apx-search input').on('focus', function(){
      console.log('Input focused')
      self.currentInputElement = this // Armazenar referência
      self.show(this)
    })

    // Listener para input/keyup - sincronizar valores
    $('.search-shelf input, input[name="term"], .search-input, .apx-search input').on('input keyup', function(){
      console.log('Input value changed:', this.value)
      self.localTerm = this.value
      
      // Sincronizar com input interno do InstantSearch
      if (self.$refs.input) {
        self.$refs.input.value = this.value
      }
    })
    
    // // Listener para blur
    // $('.search-shelf input, input[name="term"], .search-input, .apx-search input').on('blur', function(){
    //   setTimeout(() => {
    //     if (!self.$el || !self.$el.contains(document.activeElement)) {
    //       self.hide()
    //     }
    //   }, 150)
    // })
     // Listener global para detectar cliques fora
    document.addEventListener('click', this.handleClickOutside)
    
    // Reposicionar quando a janela for redimensionada
    
    window.addEventListener('resize', this.repositionSearch)
    window.addEventListener('scroll', this.repositionSearch)
  },

  beforeDestroy() {
    this.removeSearchInputListeners()
    document.removeEventListener('click', this.handleClickOutside)
    window.removeEventListener('resize', this.repositionSearch)
    window.removeEventListener('scroll', this.repositionSearch)
  },

  methods: {
    handleClickOutside(event) {
      if (!this.isVisible) return
      
      // Verificar se o clique foi dentro do InstantSearch
      const isClickInsideSearch = this.$el && this.$el.contains(event.target)
      
      // Verificar se o clique foi no input de busca
      const isClickInsideInput = this.currentInputElement && this.currentInputElement.contains(event.target)
      
      // Verificar se o clique foi em qualquer input de busca
      const isClickInAnySearchInput = $('.search-shelf input, input[name="term"], .search-input, .apx-search input').is(event.target)
      
      console.log('Click detected:', {
        isClickInsideSearch,
        isClickInsideInput,
        isClickInAnySearchInput,
        target: event.target
      })
      
      // Só fechar se o clique foi fora de tudo relacionado à busca
      if (!isClickInsideSearch && !isClickInsideInput && !isClickInAnySearchInput) {
        console.log('Clicking outside - hiding InstantSearch')
        this.hide()
      }
    },
    repositionSearch() {
      if (this.isVisible && this.currentInputElement) {
        this.show(this.currentInputElement)
      }
    },

    hide () {
      this.$emit('update:is-visible', false)

       if (this.$el) {
        this.$el.style.position = ''
        this.$el.style.top = ''
        this.$el.style.left = ''
        this.$el.style.width = ''
        this.$el.style.zIndex = ''
      }
    },

    show (inputElement) {
      this.$emit('update:is-visible', true)
      if (inputElement && this.$el) {
        this.$nextTick(() => {
          const inputRect = inputElement.getBoundingClientRect()
          const inputStyles = window.getComputedStyle(inputElement)
          
          // Calcular posição
          const top = inputRect.bottom + window.scrollY
          const left = inputRect.left + window.scrollX
          const width = inputRect.width
          
          console.log('Positioning InstantSearch:', {
            top: top,
            left: left,
            width: width,
            inputHeight: inputRect.height
          })
          
          // Aplicar estilos de posicionamento
          this.$el.style.position = 'absolute'
          this.$el.style.top = `${top}px`
          this.$el.style.left = `${left}px`
          this.$el.style.width = `${width}px`
          this.$el.style.zIndex = '9999'
          this.$el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
          this.$el.style.backgroundColor = '#fff'
          this.$el.style.border = '1px solid #ddd'
          this.$el.style.borderRadius = '4px'
          this.$el.style.marginTop = '2px'
          
          // Verificar se está fora da tela e ajustar se necessário
          const searchRect = this.$el.getBoundingClientRect()
          const viewportWidth = window.innerWidth
          const viewportHeight = window.innerHeight
          
          // Ajustar horizontalmente se necessário
          if (searchRect.right > viewportWidth) {
            const newLeft = viewportWidth - searchRect.width - 10
            this.$el.style.left = `${newLeft}px`
          }
          
          // Ajustar verticalmente se necessário (mostrar acima do input)
          if (searchRect.bottom > viewportHeight) {
            const newTop = inputRect.top + window.scrollY - searchRect.height - 2
            this.$el.style.top = `${newTop}px`
          }
        })
      }
    },

    

    removeSearchInputListeners() {
      if (this.searchInputListeners) {
        const { element, focusHandler, blurHandler } = this.searchInputListeners
        element.removeEventListener('focus', focusHandler)
        element.removeEventListener('blur', blurHandler)
        this.searchInputListeners = null
      }
    },

    setSearchTerm (term) {
      const $form = this.$el.parentElement
      if ($form && $form.tagName === 'FORM') {
        const $inputs = $form.elements
        for (let i = 0; i < $inputs.length; i++) {
          if ($inputs[i].name === 'term') {
            $inputs[i].value = term
            break
          }
        }
        $form.submit()
      } else {
        this.localTerm = term
      }
    },

    handleFetching ({ fetching }) {
      this.isSearching = true
      fetching.finally(() => {
        this.isSearching = false
      })
    },

    handleSearch ({ ecomSearch }) {
      this.totalSearchResults = ecomSearch.getTotalCount()
      this.history = ecomSearch.history
        .filter(term => term.length > 2 && this.localTerm.indexOf(term) === -1)
        .slice(0, 6)
      if (!this.hasSearched) {
        this.hasSearched = true
      }
    }
  },

  watch: {
    isVisible: {
      handler (isVisible) {
        console.log('isVisible changed:', isVisible)
        if (isVisible) {
          this.$nextTick(() => {
            // Focar no input interno do componente se existir
            if (this.$refs.input) {
              this.$refs.input.focus()
            }
          })
        }
      },
      immediate: true
    },

    localTerm: {
      handler (term) {
        const nextSearchTerm = term.length > 2 ? term : ''
        if (nextSearchTerm !== this.searchTerm) {
          clearTimeout(this.searchTriggerTimer)
          this.searchTriggerTimer = setTimeout(() => {
            this.searchTerm = nextSearchTerm
          }, 400)
        }
        this.$emit('update:term', term)
      },
      immediate: true
    }
  }
}
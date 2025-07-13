import { expect, test } from 'vitest'
import * as mod from './modifiers'

test('startWith', () => {
  expect(mod.startWith('helloworld.com', 'www.')).toBe('www.helloworld.com')
  expect(mod.startWith('www.helloworld.com', 'www.')).toBe('www.helloworld.com')
})

test('startWithout', () => {
  expect(mod.startWithout('www.helloworld.com', 'www.')).toBe('helloworld.com')
  expect(mod.startWithout('helloworld.com', 'www.')).toBe('helloworld.com')
})

test('endWith', () => {
  expect(mod.endWith('www.helloworld', '.com')).toBe('www.helloworld.com')
  expect(mod.endWith('www.helloworld.com', '.com')).toBe('www.helloworld.com')
})

test('endWithout', () => {
  expect(mod.endWithout('www.helloworld.com', '.com')).toBe('www.helloworld')
  expect(mod.endWithout('helloworld.com', '.com')).toBe('helloworld')
  expect(mod.endWithout('filename.txt', '.txt')).toBe('filename')
  expect(mod.endWithout('filename.txt', '.jpg')).toBe('filename.txt')
  expect(mod.endWithout('', '.txt')).toBe('')
  expect(mod.endWithout('filename.txt', '')).toBe('filename.txt')
  expect(mod.endWithout('.txt', '.txt')).toBe('')
})

test('surroundWith', () => {
  expect(mod.surroundWith('helloworld', 'www.', '.com')).toBe('www.helloworld.com')
  expect(mod.surroundWith('helloworld.com', 'www.', '.com')).toBe('www.helloworld.com')
  expect(mod.surroundWith('www.helloworld', 'www.', '.com')).toBe('www.helloworld.com')
  expect(mod.surroundWith('www.helloworld.com', 'www.', '.com')).toBe('www.helloworld.com')
})

test('pluralize', () => {
  expect(mod.pluralize('cat', 2)).toBe('cats')
  expect(mod.pluralize('dog', 1)).toBe('dog')
  expect(mod.pluralize('bus', 2)).toBe('buses')
  expect(mod.pluralize('box', 2)).toBe('boxes')
  expect(mod.pluralize('church', 2)).toBe('churches')
  expect(mod.pluralize('baby', 2)).toBe('babies')
  expect(mod.pluralize('leaf', 2)).toBe('leaves')
  expect(mod.pluralize('life', 2)).toBe('lives')
  expect(mod.pluralize('potato', 2)).toBe('potatoes')
  expect(mod.pluralize('cactus', 2)).toBe('cacti')
  // unchanging plural
  expect(mod.pluralize('sheep', 0)).toBe('sheep')
  expect(mod.pluralize('sheep', 1)).toBe('sheep')
  expect(mod.pluralize('sheep', 2)).toBe('sheep')
  // irregular plural
  expect(mod.pluralize('child', 2)).toBe('children')
  // Words with consonant before y
  expect(mod.pluralize('city', 2)).toBe('cities')
  expect(mod.pluralize('party', 2)).toBe('parties')
  expect(mod.pluralize('lady', 2)).toBe('ladies')
  expect(mod.pluralize('story', 2)).toBe('stories')
  expect(mod.pluralize('family', 2)).toBe('families')
  // Words with vowel before y
  expect(mod.pluralize('key', 2)).toBe('keys')
  expect(mod.pluralize('boy', 2)).toBe('boys')
  expect(mod.pluralize('toy', 2)).toBe('toys')
  expect(mod.pluralize('day', 2)).toBe('days')
  expect(mod.pluralize('monkey', 2)).toBe('monkeys')
})

test('singularize', () => {
  expect(mod.singularize('sheep')).toBe('sheep')
  expect(mod.singularize('apples')).toBe('apple')
  expect(mod.singularize('apple')).toBe('apple')
  expect(mod.singularize('boxes')).toBe('box')
  expect(mod.singularize('buses')).toBe('bus')
  expect(mod.singularize('children')).toBe('child')
  expect(mod.singularize('geese')).toBe('goose')
  expect(mod.singularize('leaves')).toBe('leaf')
  expect(mod.singularize('knives')).toBe('knife')
  expect(mod.singularize('cities')).toBe('city')
  expect(mod.singularize('buses')).toBe('bus')
  expect(mod.singularize('kisses')).toBe('kiss')
  expect(mod.singularize('boxes')).toBe('box')
  expect(mod.singularize('churches')).toBe('church')
  expect(mod.singularize('brushes')).toBe('brush')
  expect(mod.singularize('dresses')).toBe('dress')
  // Words with consonant before y
  expect(mod.singularize('cities')).toBe('city')
  expect(mod.singularize('parties')).toBe('party')
  expect(mod.singularize('ladies')).toBe('lady')
  expect(mod.singularize('stories')).toBe('story')
  expect(mod.singularize('families')).toBe('family')
  // Words with vowel before y
  expect(mod.singularize('keys')).toBe('key')
  expect(mod.singularize('boys')).toBe('boy')
  expect(mod.singularize('toys')).toBe('toy')
  expect(mod.singularize('days')).toBe('day')
  expect(mod.singularize('monkeys')).toBe('monkey')
})

test('stripHtml', () => {
  // Basic tag stripping
  expect(mod.stripHtml('<p>Hello world</p>')).toBe('Hello world')
  expect(mod.stripHtml('<b>Hello world</b>')).toBe('Hello world')
  expect(mod.stripHtml('<script>Hello world</script>')).toBe('Hello world')
  expect(mod.stripHtml('<style>Hello world</style>')).toBe('Hello world')

  // Nested tags
  expect(mod.stripHtml('<div><p>Hello <b>world</b></p></div>')).toBe('Hello world')
  expect(mod.stripHtml('<div class="test"><span>Nested</span> content</div>')).toBe('Nested content')

  // HTML entities
  expect(mod.stripHtml('&lt;div&gt;Hello&lt;/div&gt;')).toBe('<div>Hello</div>')
  expect(mod.stripHtml('Copyright &copy; 2024')).toBe('Copyright © 2024')
  expect(mod.stripHtml('Price: &pound;99.99 (&euro;120)')).toBe('Price: £99.99 (€120)')
  expect(mod.stripHtml('Quote: &ldquo;Hello&rdquo;')).toBe('Quote: "Hello"')

  // Numeric entities
  expect(mod.stripHtml('&#65;&#66;&#67;')).toBe('ABC')
  expect(mod.stripHtml('&#x41;&#x42;&#x43;')).toBe('ABC')

  // Edge cases
  expect(mod.stripHtml('')).toBe('')
  expect(mod.stripHtml('   ')).toBe('')
  expect(mod.stripHtml('<>')).toBe('')
  expect(mod.stripHtml('<p>  Spaces  </p>')).toBe('Spaces')
  expect(mod.stripHtml('No HTML at all')).toBe('No HTML at all')

  // Non-string input (should return empty string)
  expect(mod.stripHtml(null as unknown as string)).toBe('')
  expect(mod.stripHtml(undefined as unknown as string)).toBe('')
  expect(mod.stripHtml(123 as unknown as string)).toBe('')
  expect(mod.stripHtml({} as unknown as string)).toBe('')

  // HTML tags without closing brackets
  expect(mod.stripHtml('<p>Hello world')).toBe('Hello world')
  expect(mod.stripHtml('Hello world</p>')).toBe('Hello world')
  expect(mod.stripHtml('<p>Hello<world')).toBe('Helloworld')
  expect(mod.stripHtml('<p>Hello>world')).toBe('Hello>world')

  // Complex tag scenarios
  expect(mod.stripHtml('<p>Hello</p><div>World</div>')).toBe('HelloWorld')
  expect(mod.stripHtml('<p>Hello<div>World</div></p>')).toBe('HelloWorld')
  expect(mod.stripHtml('<p>Hello<div>World')).toBe('HelloWorld')

  // Named entities that don't exist in the map (should return original)
  expect(mod.stripHtml('&nonexistent;')).toBe('&nonexistent;')
  expect(mod.stripHtml('&invalid')).toBe('&invalid')
  expect(mod.stripHtml('&')).toBe('&')

  // All named entities in the map
  expect(mod.stripHtml('&amp;')).toBe('&')
  expect(mod.stripHtml('&lt;')).toBe('<')
  expect(mod.stripHtml('&gt;')).toBe('>')
  expect(mod.stripHtml('&quot;')).toBe('"')
  expect(mod.stripHtml('&apos;')).toBe('\'')
  expect(mod.stripHtml('&nbsp;')).toBe('')
  expect(mod.stripHtml('&copy;')).toBe('©')
  expect(mod.stripHtml('&reg;')).toBe('®')
  expect(mod.stripHtml('&trade;')).toBe('™')
  expect(mod.stripHtml('&deg;')).toBe('°')
  expect(mod.stripHtml('&pound;')).toBe('£')
  expect(mod.stripHtml('&euro;')).toBe('€')
  expect(mod.stripHtml('&cent;')).toBe('¢')
  expect(mod.stripHtml('&sect;')).toBe('§')
  expect(mod.stripHtml('&para;')).toBe('¶')
  expect(mod.stripHtml('&middot;')).toBe('·')
  expect(mod.stripHtml('&bull;')).toBe('•')
  expect(mod.stripHtml('&ndash;')).toBe('–')
  expect(mod.stripHtml('&mdash;')).toBe('—')
  expect(mod.stripHtml('&lsquo;')).toBe('\'')
  expect(mod.stripHtml('&rsquo;')).toBe('\'')
  expect(mod.stripHtml('&ldquo;')).toBe('"')
  expect(mod.stripHtml('&rdquo;')).toBe('"')

  // Mixed content with various entity types
  expect(mod.stripHtml('<p>Hello &amp; &lt;world&gt; &copy; 2024</p>')).toBe('Hello & <world> © 2024')
  expect(mod.stripHtml('&#65;&amp;&#x42;&lt;&#67;')).toBe('A&B<C')

  // Whitespace handling
  expect(mod.stripHtml('  <p>Hello</p>  ')).toBe('Hello')
  expect(mod.stripHtml('\n<p>Hello</p>\n')).toBe('Hello')
  expect(mod.stripHtml('\t<p>Hello</p>\t')).toBe('Hello')
})

test('escapeHtml', () => {
  expect(mod.escapeHtml('<p>Hello world</p>')).toBe('&lt;p&gt;Hello world&lt;/p&gt;')
})

test('unescapeHtml', () => {
  expect(mod.unescapeHtml('&lt;p&gt;Hello World&lt;/p&gt;')).toBe('<p>Hello World</p>')
})

test('stripEmojis', () => {
  expect(mod.stripEmojis('Hello 😃')).toBe('Hello ')
  expect(mod.stripEmojis('Hello 😃👍')).toBe('Hello ')
  expect(mod.stripEmojis('Hello 😃👍🏻')).toBe('Hello ')
  expect(mod.stripEmojis('Hello 🎉')).toBe('Hello ')
})

test('stripWhitespace', () => {
  expect(mod.stripWhitespace('Hello world')).toBe('Helloworld')
})

test('stripNumbers', () => {
  expect(mod.stripNumbers('Hello world 123')).toBe('Hello world ')
})

test('stripSymbols', () => {
  expect(mod.stripSymbols('Hello world!')).toBe('Hello world')
  expect(mod.stripSymbols('Hello world!@£$%^&*()')).toBe('Hello world')
})

test('stripPunctuation', () => {
  expect(mod.stripPunctuation('Hello world!')).toBe('Hello world')
  expect(mod.stripPunctuation('Hello, world!')).toBe('Hello world')
})

test('slugify', () => {
  expect(mod.slugify('Hello world')).toBe('hello-world')
})

test('deslugify', () => {
  expect(mod.deslugify('hello-world')).toBe('hello world')
})

test('ordinalize', () => {
  expect(mod.ordinalize(1)).toBe('1st')
  expect(mod.ordinalize(2)).toBe('2nd')
  expect(mod.ordinalize(3)).toBe('3rd')
  expect(mod.ordinalize(4)).toBe('4th')
  expect(mod.ordinalize(104)).toBe('104th')
})

test('camelCase', () => {
  expect(mod.camelCase('')).toBe('')
  expect(mod.camelCase('Hello world')).toBe('helloWorld')
  expect(mod.camelCase('Hello world!  This is a test.  ')).toBe('helloWorldThisIsATest')
})

test('pascalCase', () => {
  expect(mod.pascalCase('')).toBe('')
  expect(mod.pascalCase('Hello world')).toBe('HelloWorld')
  expect(mod.pascalCase('Hello world!  This is a test.  ')).toBe('HelloWorldThisIsATest')
})

test('snakeCase', () => {
  expect(mod.snakeCase('')).toBe('')
  expect(mod.snakeCase('Hello world')).toBe('hello_world')
  expect(mod.snakeCase('Hello world!  This is a test.  ')).toBe('hello_world_this_is_a_test')
})

test('kebabCase', () => {
  expect(mod.kebabCase('')).toBe('')
  expect(mod.kebabCase('Hello world')).toBe('hello-world')
  expect(mod.kebabCase('Hello world!  This is a test.  ')).toBe('hello-world-this-is-a-test')
})

test('titleCase', () => {
  expect(mod.titleCase('hello world')).toBe('Hello World')
})

<template>
  <DocsLayout>
    <PageTitle>
      <h1>Validators</h1>
      <p>A collection of validators for common data types</p>
    </PageTitle>

    <PageFunction
      name="isEmail"
      description="Check if any given value is a valid email address."
      :params='[{"name":"value","type":"string"}]'
    >
      <IsEmail />
    </PageFunction>

    <PageFunction
      name="isNumber"
      description="Check if any given value is a valid number."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsNumber />
    </PageFunction>

    <PageFunction
      name="isUrl"
      description="Check if any given value is a valid URL."
      :params='[{"name":"value","type":"string"}]'
    >
      <IsUrl />
    </PageFunction>

    <PageFunction
      name="isEmpty"
      description="Check if any given string, array or object is empty."
      :params='[{"name":"value","type":"string | string[] | number[] | object | null | undefined"}]'
    >
      <IsEmpty />
    </PageFunction>

    <PageFunction
      name="isUuid"
      description="Check if any given value is a valid UUID."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsUuid />
    </PageFunction>

    <PageFunction
      name="isJson"
      description="Check if any given value is a valid JSON string."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsJson />
    </PageFunction>

    <PageFunction
      name="isObject"
      description="Check if any given value is an object."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsObject />
    </PageFunction>

    <PageFunction
      name="isArray"
      description="Check if any given value is an array."
      :params='[{"name":"value","type":"string[] | number[]"}]'
    >
      <IsArray />
    </PageFunction>

    <PageFunction
      name="isHex"
      description="Check if any given value is a valid hexadecimal color code."
      :params='[{"name":"value","type":"string"}]'
    >
      <IsHex />
    </PageFunction>

    <PageFunction
      name="isAlphabetic"
      description="Check if any given value contains only alphabetic characters."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsAlphabetic />
    </PageFunction>

    <PageFunction
      name="isAlphanumeric"
      description="Check if any given value contains only alphanumeric characters."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsAlphanumeric />
    </PageFunction>

    <PageFunction
      name="isBoolean"
      description="Check if any given value is a boolean value."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsBoolean />
    </PageFunction>

    <PageFunction
      name="isUndefined"
      description="Check if any given value is undefined."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsUndefined />
    </PageFunction>

    <PageFunction
      name="isNull"
      description="Check if any given value is null."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsNull />
    </PageFunction>

    <PageFunction
      name="isDate"
      description="Check if any given value is a valid Date object."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsDate />
    </PageFunction>

    <PageFunction
      name="isTime"
      description="Check if any given value is a valid time in HH:mm format."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsTime />
    </PageFunction>

    <PageFunction
      name="isLeapYear"
      description="Check if any given value year is a leap year."
      :params='[{"name":"value","type":"number"}]'
    >
      <IsLeapYear />
    </PageFunction>

    <PageFunction
      name="isEven"
      description="Check if the number is even."
      :params='[{"name":"value","type":"number"}]'
    >
      <IsEven />
    </PageFunction>

    <PageFunction
      name="isOdd"
      description="Check if the number is odd."
      :params='[{"name":"value","type":"number"}]'
    >
      <IsOdd />
    </PageFunction>

    <PageFunction
      name="isPositive"
      description="Check if the number is positive."
      :params='[{"name":"value","type":"number"}]'
    >
      <IsPositive />
    </PageFunction>

    <PageFunction
      name="isNegative"
      description="Check if the number is negative."
      :params='[{"name":"value","type":"number"}]'
    >
      <IsNegative />
    </PageFunction>

    <PageFunction
      name="isZero"
      description="Check if the number is zero."
      :params='[{"name":"value","type":"number"}]'
    >
      <IsZero />
    </PageFunction>

    <PageFunction
      name="isOver9000"
      description="Check if the number is over 9000."
      :params='[{"name":"value","type":"number"}]'
    >
      <IsOver9000 />
    </PageFunction>

    <PageFunction
      name="isPrime"
      description="Check if the number is a prime number."
      :params='[{"name":"value","type":"number"}]'
    >
      <IsPrime />
    </PageFunction>

    <PageFunction
      name="isInteger"
      description="Check if the number is an integer."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsInteger />
    </PageFunction>

    <PageFunction
      name="isFloat"
      description="Check if the number is a float."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsFloat />
    </PageFunction>

    <PageFunction
      name="isBetween"
      description="Check if the number is between the specified range."
      :params='[{"name":"value","type":"number"},{"name":"min","type":"number"},{"name":"max","type":"number"}]'
    >
      <IsBetween />
    </PageFunction>

    <PageFunction
      name="isDivisibleBy"
      description="Check if the number is divisible by the specified number."
      :params='[{"name":"value","type":"number"},{"name":"divisor","type":"number"}]'
    >
      <IsDivisibleBy />
    </PageFunction>

    <PageFunction
      name="isCreditCard"
      description="Check if any given value is a valid credit card number."
      :params='[{"name":"value","type":"unknown"}]'
    >
      <IsCreditCard />
    </PageFunction>

    <PageFunction
      name="isLatLng"
      description="Check if any given value is a valid latitude-longitude coordinate in the format lat,lng or lat,lng."
      :params='[{"name":"value","type":"string"}]'
    >
      <IsLatLng />
    </PageFunction>

    <PageFunction
      name="isLatitude"
      description="Check if any given value is a valid latitude coordinate."
      :params='[{"name":"value","type":"string"}]'
    >
      <IsLatitude />
    </PageFunction>

    <PageFunction
      name="isLongitude"
      description="Check if any given value is a valid longitude coordinate."
      :params='[{"name":"value","type":"string"}]'
    >
      <IsLongitude />
    </PageFunction>

    <PageFunction
      name="isIpAddress"
      description="Check if any given value is a valid IP address."
      :params='[{"name":"value","type":"string"}]'
    >
      <IsIpAddress />
    </PageFunction>

    <PageFunction
      name="isPort"
      description="Check if any given value is a valid port number."
      :params='[{"name":"value","type":"number"}]'
    >
      <IsPort />
    </PageFunction>

    <PageFunction
      name="isMacAddress"
      description="Check if any given value is a valid MAC address."
      :params='[{"name":"value","type":"string"}]'
    >
      <IsMacAddress />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import IsAlphabetic from '~/components/content/validators/IsAlphabetic.vue'
import IsAlphanumeric from '~/components/content/validators/IsAlphanumeric.vue'
import IsArray from '~/components/content/validators/IsArray.vue'
import IsBetween from '~/components/content/validators/IsBetween.vue'
import IsBoolean from '~/components/content/validators/IsBoolean.vue'
import IsCreditCard from '~/components/content/validators/IsCreditCard.vue'
import IsDate from '~/components/content/validators/IsDate.vue'
import IsDivisibleBy from '~/components/content/validators/IsDivisibleBy.vue'
import IsEmail from '~/components/content/validators/IsEmail.vue'
import IsEmpty from '~/components/content/validators/IsEmpty.vue'
import IsEven from '~/components/content/validators/IsEven.vue'
import IsFloat from '~/components/content/validators/IsFloat.vue'
import IsHex from '~/components/content/validators/IsHex.vue'
import IsInteger from '~/components/content/validators/IsInteger.vue'
import IsIpAddress from '~/components/content/validators/IsIpAddress.vue'
import IsJson from '~/components/content/validators/IsJson.vue'
import IsLatLng from '~/components/content/validators/IsLatLng.vue'
import IsLatitude from '~/components/content/validators/IsLatitude.vue'
import IsLeapYear from '~/components/content/validators/IsLeapYear.vue'
import IsLongitude from '~/components/content/validators/IsLongitude.vue'
import IsMacAddress from '~/components/content/validators/IsMacAddress.vue'
import IsNegative from '~/components/content/validators/IsNegative.vue'
import IsNull from '~/components/content/validators/IsNull.vue'
import IsNumber from '~/components/content/validators/IsNumber.vue'
import IsObject from '~/components/content/validators/IsObject.vue'
import IsOdd from '~/components/content/validators/IsOdd.vue'
import IsOver9000 from '~/components/content/validators/IsOver9000.vue'
import IsPort from '~/components/content/validators/IsPort.vue'
import IsPositive from '~/components/content/validators/IsPositive.vue'
import IsPrime from '~/components/content/validators/IsPrime.vue'
import IsTime from '~/components/content/validators/IsTime.vue'
import IsUndefined from '~/components/content/validators/IsUndefined.vue'
import IsUrl from '~/components/content/validators/IsUrl.vue'
import IsUuid from '~/components/content/validators/IsUuid.vue'
import IsZero from '~/components/content/validators/IsZero.vue'

const toc = ["isEmail","isNumber","isUrl","isEmpty","isUuid","isJson","isObject","isArray","isHex","isAlphabetic","isAlphanumeric","isBoolean","isUndefined","isNull","isDate","isTime","isLeapYear","isEven","isOdd","isPositive","isNegative","isZero","isOver9000","isPrime","isInteger","isFloat","isBetween","isDivisibleBy","isCreditCard","isLatLng","isLatitude","isLongitude","isIpAddress","isPort","isMacAddress"]
const pageId = 'validators'

provide('toc', toc)
provide('pageId', pageId)
</script>

const { ENS } = require('@ensdomains/ensjs')
const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com	')

const ENSInstance = new ENS()
async function jono() {
    await ENSInstance.setProvider(provider)

    const profile = await ENSInstance.getProfile('braverelliot.eth')
    console.log(profile)
}
jono()

// var findMedianSortedArrays = function(nums1, nums2) {
//     const median = arr => {
//   const mid = Math.floor(arr.length / 2),
//     nums = [...arr].sort((a, b) => a - b);
//   return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
// };
// return (nums1.concat(nums2))
// };


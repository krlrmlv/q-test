/* eslint-disable no-undef */

export default function sendToMindbox(operation, data) {
  setTimeout(() => {
    if (mindbox !== undefined) {
      mindbox('async', {
        operation,
        data,
        onSuccess: () => {
          console.log("success")
        },
        onError: (event) => {
          console.log(`Error in sentToMindbox: ${event?.target?.src}`)
        },
      })
    }
  }, 1000)
}

// Calculators
export function mindboxViewCalculator(calculatorName) {
  sendToMindbox('EKFGroup.ViewCalculator', {
    customerAction: {
      customFields: {
        calculator: calculatorName,
      },
    },
  })
}

export function mindboxCalculateCalculator(calculatorName) {
  sendToMindbox('EKFGroup.Calculation', {
    customerAction: {
      customFields: {
        calculator: calculatorName,
      },
    },
  })
}

// Catalog
export function mindboxViewCatalogProduct(productId = '') {
  sendToMindbox('EKFGroup.ViewProduct', {
    viewProduct: {
      product: {
        ids: {
          eKFGroup: productId,
        },
      },
    },
  })
}

export function mindboxViewCatalogCategory(categoryId = '') {
  sendToMindbox('EKFGroup.ViewCategory', {
    viewProductCategory: {
      productCategory: {
        ids: {
          eKFGroup: categoryId,
        },
      },
    },
  })
}

export function mindboxProductConsultationForm(formData) {
  sendToMindbox('Online.Subscriptions.AskAboutProduct', {
    customer: {
      fullName: formData.fullName ?? '',
      email: formData.email ?? '',
      mobilePhone: formData.phone?.replace(/[\s\-()]/g, '') ?? '',
      subscriptions: [{ pointOfContact: 'Email', topic: 'ekfgroup' }],
    },
    customerAction: {
      customFields: {
        addressQuestion: 'Вопросы по продукции',
        questionFOS: 'Вопрос по продукции',
      },
    },
  })
}

// Cart
export function mindboxSetCart(cart, source) {
  const productList = []

  cart.forEach((product) => {
    productList.push({
      product: {
        ids: {
          eKFGroup: product?.id,
        },
      },
      customFields: {
        source,
      },
      count: product?.cart?.quantity,
      priceOfLine: Number(product?.price) * product?.cart?.quantity,
    })
  })

  sendToMindbox('EKFGroup.SetCart', { productList })
}

// Documents
export function mindboxDocumentDownload(source = '') {
  sendToMindbox('EKFGroup.DocumentsDownload', {
    customerAction: {
      customFields: {
        PageNameForDocumentsDownload: source,
      },
    },
  })
}

// Solutions
export function mindboxViewSolution(solutionId = '') {
  sendToMindbox('EKFGroup.ViewSolutions', {
    viewProduct: {
      product: {
        ids: {
          eKFGroup: solutionId,
        },
      },
    },
  })
}

export function mindboxViewSolutionsCategory(categoryId = '') {
  sendToMindbox('EKFGroup.ViewSolutionsCategory', {
    viewProductCategory: {
      productCategory: {
        ids: {
          eKFGroup: categoryId,
        },
      },
    },
  })
}

// Visits
export async function mindboxUserVisit(cookies) {
  const MINDBOX_VISIT_COOKIE = 'mindbox_visit'
  const visited = await cookies.get(MINDBOX_VISIT_COOKIE)

  if (typeof visited === 'undefined') {
    try {
      await cookies.set(MINDBOX_VISIT_COOKIE, true, {
        maxAge: 60 * 30, // 30 minutes
        path: '/',
        sameSite: true,
      })

      sendToMindbox('EKFGroupPoseshhenieSajta')
    } catch (e) {}
  }
}
